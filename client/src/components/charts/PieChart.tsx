import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

interface PieChartDataConfig {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  hoverBackgroundColor?: string[];
}

interface PieChartProps {
  endpoint: string;
  dataMapper: (data: any) => PieChartDataConfig;
  refreshInterval?: number;
  title?: string;
}

const PieChart = ({
  endpoint,
  dataMapper,
  refreshInterval = 60000,
  title,
}: PieChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        const mappedData = dataMapper(response.data);

        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            if (chartInstance.current) {
              chartInstance.current.destroy();
            }
            chartInstance.current = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: mappedData.labels,
                datasets: [
                  {
                    label: title || 'Data',
                    data: mappedData.data,
                    backgroundColor:
                      mappedData.backgroundColor || [
                        '#36A2EB',
                        '#FF6384',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                      ],
                    hoverBackgroundColor:
                      mappedData.hoverBackgroundColor || [
                        '#36A2EB',
                        '#FF6384',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                      ],
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: title ? {
                    display: true,
                    text: title,
                  } : undefined,
                },
              },
            });
          }
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => {
      clearInterval(interval);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [endpoint, dataMapper, refreshInterval, title]);

  return <canvas ref={chartRef} />;
};

export default PieChart;

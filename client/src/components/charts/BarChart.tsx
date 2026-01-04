import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface ChartDataConfig {
  labels: string[];
  datasets: Dataset[];
}

interface BarChartProps {
  endpoint: string;
  dataMapper: (data: any) => ChartDataConfig;
  refreshInterval?: number;
  title?: string;
}

const BarChart = ({
  endpoint,
  dataMapper,
  refreshInterval = 2000,
  title,
}: BarChartProps) => {
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
              type: 'bar',
              data: {
                labels: mappedData.labels,
                datasets: mappedData.datasets,
              },
              options: {
                animation: {
                  duration: 0,
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
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

export default BarChart;

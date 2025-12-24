import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('YOUR_API_ENDPOINT_HERE');
        const data = response.data;

        // Mock data for demonstration
        // const data = {
        //   labels: ['VM1', 'VM2', 'VM3', 'VM4', 'VM5'],
        //   cpuUsage: [65, 59, 80, 81, 56],
        //   ramUsage: [45, 49, 60, 71, 46],
        // };

        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            if (chartInstance.current) {
              chartInstance.current.destroy();
            }
            chartInstance.current = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: data.labels,
                datasets: [
                  {
                    label: 'CPU Usage (%)',
                    data: data.cpuUsage,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                  {
                    label: 'RAM Usage (%)',
                    data: data.ramUsage,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;

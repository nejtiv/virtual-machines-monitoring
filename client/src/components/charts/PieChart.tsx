import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PieChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/analytics/vm/online_offline');
        const data = response.data;
        
        // Mock data for demonstration
        // const data = {
        //   online: 300,
        //   offline: 50,
        // };

        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            if (chartInstance.current) {
              chartInstance.current.destroy();
            }
            chartInstance.current = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['Virtual Machines Online', 'Virtual Machines Offline'],
                datasets: [
                  {
                    label: 'VM Status',
                    data: [data.online, data.offline],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
              },
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => {
      clearInterval(interval);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default PieChart;

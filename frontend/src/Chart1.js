import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Chart1 = () => {
  const data = {
    labels: ['05.23', '05.24', '05.25', '05.26', '05.27', '05.28', '05.29'],
    datasets: [
      {
        label: 'Call for Service',
        data: [750, 500, 400, 300, 450, 550, 700],
        fill: true,
        backgroundColor: 'rgba(120, 81, 169, 0.2)', // Purple transparent fill
        borderColor: '#7851A9', // Purple line
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} Calls`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
      },
    },
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart1;

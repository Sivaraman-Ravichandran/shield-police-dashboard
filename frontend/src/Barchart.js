import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const Barchart = () => {
  const data = {
    labels: ['05.23', '05.24', '05.25', '05.26', '05.27', '05.28', '05.29'],
    datasets: [
      {
        label: 'Incidents',
        data: [350, 400, 200, 170, 300, 420, 480],
        backgroundColor: 'rgba(229, 62, 62, 0.6)', // Red bars
        borderColor: '#E53E3E',
        borderWidth: 1,
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
          label: (context) => `${context.raw} Incidents`,
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default Barchart;

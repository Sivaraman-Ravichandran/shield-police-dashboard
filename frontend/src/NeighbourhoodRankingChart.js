import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './NeighbourhoodRankingChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NeighbourhoodRankingChart = () => {
  const [selectedOption, setSelectedOption] = useState('default');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const data = {
    default: {
      labels: ['Shabany', 'Vostok', 'Center', 'Nemiga', 'Suharevo', 'Malinovka', 'Uruchie'],
      datasets: [
        {
          label: 'Hotspot Ranking (%)',
          data: [98, 90, 75, 73, 65, 50, 30],
          backgroundColor: ['#e74c3c', '#e67e22', '#f1c40f', '#3498db', '#2ecc71', '#9b59b6', '#34495e'],
          borderWidth: 1,
        },
      ],
    },
    // Add other options here
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Neighbourhood Hotspots Ranking',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Neighborhoods',
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Ranking (%)',
        },
      },
    },
  };

  return (
    <div className="chart-container neighbourhood-ranking">
      <h3>Neighbourhood Hotspots Ranking</h3>
      <select value={selectedOption} onChange={handleChange}>
        <option value="default">Default</option>
        {/* Add more options if needed */}
      </select>
      <Bar data={data[selectedOption]} options={options} />
    </div>
  );
};

export default NeighbourhoodRankingChart;

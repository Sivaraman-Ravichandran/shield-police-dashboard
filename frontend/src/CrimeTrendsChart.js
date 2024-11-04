import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './CrimeTrendsChart.css';

const CrimeTrendsChart = () => {
  const [selectedOption, setSelectedOption] = useState('default');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const data = {
    default: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Burglaries',
          data: [30, 50, 20, 40, 50, 70, 60, 80, 90, 50, 40, 60],
          backgroundColor: '#9f7aea',
        },
      ],
    },
    // Add other options here
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container crime-trends">
      <h3>Crime Trends</h3>
      <select value={selectedOption} onChange={handleChange}>
        <option value="default">Default</option>
        {/* Add more options if needed */}
      </select>
      <Bar data={data[selectedOption]} options={options} />
    </div>
  );
};

export default CrimeTrendsChart;

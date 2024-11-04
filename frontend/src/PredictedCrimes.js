import React from 'react';

const predictedCrimes = [
  { time: '10:00-12:00', crimes: ['Assault', 'Burglary', 'Vehicle theft'] },
  { time: '12:00-14:00', crimes: ['Theft', 'Assault', 'Burglary'] },
  { time: '14:00-18:00', crimes: ['Burglary', 'Vehicle theft'] },
];

const PredictedCrimes = () => {
  return (
    <div className="predicted-crimes">
      <h3>Top 3 Predicted Crimes in Minsk</h3>
      <div className="crime-list">
        {predictedCrimes.map((crime, index) => (
          <div className="crime-card" key={index} style={styles.card}>
            <h4>{crime.time}</h4>
            <ul>
              {crime.crimes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styling the cards
const styles = {
  card: {
    backgroundColor: '#2c3e50',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
    color: 'white',
  },
};

export default PredictedCrimes;

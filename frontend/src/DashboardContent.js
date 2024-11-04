
// components/DashboardContent.js
import React from 'react';
import './DashboardContent.css';
import CrimeTrendsChart from './CrimeTrendsChart';
import NeighbourhoodRankingChart from './NeighbourhoodRankingChart';
import PredictedCrimes from './PredictedCrimes';
import EmergencyAlert from './EmergencyAlert';
const DashboardContent = () => {
  return (
    <div className="dashboard-content">
   
    
    <EmergencyAlert/>
    
    <div className="row top-row">
     
        <div className="metric-box">
          <h3>Number of 911 calls</h3>
          <span>125</span>
          <p>in the past week</p>
        </div>
        <div className="metric-box">
          <h3>Upcoming Event</h3>
          <span>12 Jun</span>
          <p>Coldplay Concert</p>
        </div>
        <div className="metric-box">
          <h3>Suspicious Activities</h3>
          <span>27</span>
          <p>in the past week</p>
        </div>
        <div className="metric-box">
          <h3>Criminal Activity by Type</h3>
          <span>9 Violent Crimes</span>
        </div>
      </div>

      <div className="row middle-row">
        <CrimeTrendsChart />
        <NeighbourhoodRankingChart />
      </div>
      
    
    

    
      
    
    </div>
  );
};

export default DashboardContent;

import React from 'react';
import { useTheme } from './ThemeContext';
import './Dashboard1.css'; // Ensure correct CSS file is imported
import AppBar from './AppBar';
import DashboardContent from './DashboardContent';

const Dashboard1 = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <AppBar />
      <div className="theme-switch-container">
        <label className="theme-switch">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
          <span className="slider"></span>
        </label>
        <span className="mode-label">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
      </div>
      <DashboardContent />
    </div>
  );
};

export default Dashboard1;

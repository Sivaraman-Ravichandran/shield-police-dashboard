import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Dashboard1.css'
import Dashboard1 from './Dashboard1';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './ThemeContext';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeProvider>
  <Dashboard1/>
  </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

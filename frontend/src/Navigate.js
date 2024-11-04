import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmergencyAlert from './EmergencyAlert';
import Map2 from './Map2';

const Navigate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmergencyAlert />} />
        <Route path="/map/:id" element={<Map2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigate;

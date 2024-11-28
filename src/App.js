import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import DeviceDetailsPage from './components/DeviceDetailsPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/device/:id" element={<DeviceDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

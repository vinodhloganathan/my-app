import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/iot_device_data.json')
      .then((response) => response.json())
      .then((data) => setDevices(data));
  }, []);

  return (
    <div className="home-container">
      <h1>IoT Devices</h1>
      <div className="device-grid">
        {devices.map((device) => (
          <div
            key={device.id}
            className="device-card"
            onClick={() => navigate(`/device/${device.id}`)}
          >
            <h2>{device.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

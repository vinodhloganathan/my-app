import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './DeviceDetailsPage.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const DeviceDetailsPage = () => {
  const { id } = useParams();
  const [deviceData, setDeviceData] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');

  useEffect(() => {
    fetch('/iot_device_data.json')
      .then((response) => response.json())
      .then((data) => {
        const device = data.find((d) => d.id === parseInt(id));
        setDeviceData(device.data);
        setSelectedDate(device.data[0].date);
        setSelectedHour(device.data[0].hourly[0].hour);
        setFilteredData(device.data[0].hourly[0]);
      });
  }, [id]);

  const handleFilter = () => {
    const selectedDay = deviceData.find((day) => day.date === selectedDate);
    const hourlyData = selectedDay.hourly.find((h) => h.hour === parseInt(selectedHour));
    setFilteredData(hourlyData);
  };

  const chartData = {
    labels: ['Temperature', 'Energy', 'Air Quality', 'Latitude', 'Longitude'],
    datasets: [
      {
        label: 'IoT Data',
        data: [
          filteredData.temperature,
          filteredData.energy,
          filteredData.air_quality,
          filteredData.latitude,
          filteredData.longitude,
        ],
        backgroundColor: ['red', 'blue', 'green', 'purple', 'orange'],
      },
    ],
  };

  return (
    <div className="details-container">
      <div className="filters">
        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          {deviceData.map((day) => (
            <option key={day.date} value={day.date}>
              {day.date}
            </option>
          ))}
        </select>
        <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
          {[...Array(24).keys()].map((h) => (
            <option key={h} value={h + 1}>
              {h + 1}:00
            </option>
          ))}
        </select>
        <button onClick={handleFilter}>search</button>
      </div>
      <div className="chart">
        <Bar data={chartData} />
      </div>
      <div className="grid">
        <table className="table">
          <tbody>
            {['temperature', 'energy', 'air_quality', 'latitude', 'longitude'].map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{filteredData[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceDetailsPage;

import React, { useState, useEffect } from 'react';
import './EmergencyAlert.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Map2 from './Map2'; // Import the Map2 component
import VideoStream from './VideoStream'; // Import the VideoStream component
import VideoModal from './VideoModal'; // Import the VideoModal component

// API endpoints
const ALERTS_API_URL = 'http://127.0.0.1:5000/alerts';
const ADDITIONAL_ALERTS_API_URL = 'http://127.0.0.1:5000/getAlerts'; // New endpoint for extra details

// Blinking Leaflet icon
const blinkingIcon = L.divIcon({
  className: 'blinking-icon',
  iconSize: [25, 25], // Size of the icon
});

const EmergencyAlert = () => {
  const [alerts, setAlerts] = useState([]); // State for existing alerts
  const [additionalAlerts, setAdditionalAlerts] = useState([]); // State for new details
  const [selectedAlert, setSelectedAlert] = useState(null); // Track the selected alert
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility
  const [showAlerts, setShowAlerts] = useState(true); // State for toggling alerts
  const [showAdditionalAlerts, setShowAdditionalAlerts] = useState(false); // State for toggling additional alerts

  // Fetch alert data from the first Flask API (existing alerts)
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(ALERTS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch alert data');
        }
        const data = await response.json();
        setAlerts(data); // Assuming the API returns the correct structure with images
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // Fetch additional alert details from the second API endpoint
  useEffect(() => {
    const fetchAdditionalAlerts = async () => {
      try {
        const response = await fetch(ADDITIONAL_ALERTS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch additional alert data');
        }
        const data = await response.json();
        setAdditionalAlerts(data); // Assuming the API returns additional alerts data
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAdditionalAlerts();
  }, []);

  // Ensure the map fits the bounds of all the alerts' locations
  const MapFitBounds = () => {
    const map = useMap();

    useEffect(() => {
      if (alerts.length > 0 || additionalAlerts.length > 0) {
        const bounds = [
          ...alerts
            .filter(alert => alert.location?.latitude && alert.location?.longitude)
            .map(alert => [parseFloat(alert.location.latitude), parseFloat(alert.location.longitude)]),
          ...additionalAlerts
            .filter(alert => alert.latitude && alert.longitude)
            .map(alert => [alert.latitude, alert.longitude])
        ];

        if (bounds.length > 0) {
          map.fitBounds(bounds); // Fit the map to show all markers
        }
      }
    }, [alerts, additionalAlerts, map]);

    return null;
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  if (loading) {
    return <div>Loading alerts...</div>;
  }

  if (error) {
    return <div>Error fetching alerts: {error}</div>;
  }

  return (
    <div className="emergency-alert-container">
      {alerts.length > 0 && <div className="flashing-alert">⚠️ EMERGENCY</div>}

      {/* "Live" Button Below the AppBar */}
      <div className="live-button-container">
        <button onClick={() => setShowVideo(!showVideo)} className="live-button">
          {showVideo ? '🔴 Live(Hide) ' : '🔴 Live'}
        </button>
      </div>

      {/* Show Video Modal when button is clicked */}
      <VideoModal show={showVideo} handleClose={() => setShowVideo(false)}>
        <VideoStream />
      </VideoModal>

      {/* Buttons to toggle alert views */}
      <div className="toggle-buttons">
        <button onClick={() => { setShowAlerts(true); setShowAdditionalAlerts(false); }}>
          SOS Alerts
        </button>
        <button onClick={() => { setShowAlerts(false); setShowAdditionalAlerts(true); }}>
          Emergency Alerts
        </button>
      </div>

      {/* Existing Alerts Table */}
      {showAlerts && (
        <div className="alert-table-container">
          <table className="alert-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Timestamp</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {alerts.slice().reverse().map((alert, index) => ( // Reverse order
                <tr key={index} onClick={() => handleAlertClick(alert)} className="alert-row">
                  <td>{alert.message}</td>
                  <td>{alert.location?.address || 'N/A'}</td>
                  <td>{alert.location?.latitude || 'N/A'}</td>
                  <td>{alert.location?.longitude || 'N/A'}</td>
                  <td>{alert.timestamp}</td>
                  <td>
                    {alert.image && (
                      <img
                        src={`data:image/jpeg;base64,${alert.image}`}
                        alt={`Alert ${index + 1}`}
                        className="alert-image"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Additional Alerts Table */}
      {showAdditionalAlerts && (
        <div className="alert-table-container">
          <table className="alert-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {additionalAlerts.slice().reverse().map((alert, index) => ( // Reverse order
                <tr key={index} onClick={() => handleAlertClick(alert)} className="alert-row">
                  <td>{alert.name}</td>
                  <td>{alert.alert_message}</td>
                  <td>{alert.latitude || 'N/A'}</td>
                  <td>{alert.longitude || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Map Section */}
      <div className="map-section">
        <h3>All Alert Locations</h3>
        <MapContainer
          center={[12.963829, 77.505777]} // Default center location (Bengaluru)
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapFitBounds />

          {/* Markers for existing alerts */}
          {alerts.slice().reverse().map((alert, index) => (
            alert.location?.latitude && alert.location?.longitude && (
              <Marker
                key={`alert-${index}`}
                position={[parseFloat(alert.location.latitude), parseFloat(alert.location.longitude)]}
                icon={blinkingIcon}
              >
                <Popup>
                  <strong>{alert.message}</strong> <br />
                  Address: {alert.location.address} <br />
                  Latitude: {alert.location.latitude} <br />
                  Longitude: {alert.location.longitude}
                </Popup>
              </Marker>
            )
          ))}

          {/* Markers for additional alerts */}
          {additionalAlerts.slice().reverse().map((alert, index) => {
            if (alert.latitude && alert.longitude) {
              return (
                <Marker
                  key={`additional-alert-${index}`}
                  position={[alert.latitude, alert.longitude]}
                  icon={blinkingIcon}
                >
                  <Popup>
                    <strong>Name:</strong> {alert.name} <br />
                    Message: {alert.alert_message} <br />
                    Latitude: {alert.latitude} <br />
                    Longitude: {alert.longitude}
                  </Popup>
                </Marker>
              );
            } else {
              return null;
            }
          })}
        </MapContainer>
      </div>

      {/* Map2 Component */}
      <Map2 /> {/* Add the Map2 component below the map */}
    </div>
  );
};

export default EmergencyAlert;

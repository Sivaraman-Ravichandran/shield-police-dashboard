import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for the high-severity alert (blinking)
const createBlinkingIcon = () => {
  return L.divIcon({
    className: 'blinking-marker',
    html: '<div class="blinking-circle"></div>',
    iconSize: [16, 16], // Adjust icon size
    popupAnchor: [0, -10], // Adjust popup position
  });
};

// Default marker icon for other severities
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map2 = ({ selectedAlert, safeZones = [] }) => {
  
  // Ensure selectedAlert and coords exist before rendering the map
  if (!selectedAlert || !selectedAlert.coords) return null;

  // Safely retrieve alert severity and location, with fallbacks
  const severity = selectedAlert.severity ? selectedAlert.severity.toUpperCase() : 'UNKNOWN';
  const address = selectedAlert.location?.address || 'Unknown Location';
  const person = selectedAlert.person || 'Unknown Person';

  return (
    <div className="map-section">
      <h3>Selected Alert and Nearby Safe Zones</h3>
      <MapContainer
        center={selectedAlert.coords} // Center on selected alert location
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Selected alert marker */}
        <Marker
          position={selectedAlert.coords}
          icon={severity === 'HIGH' ? createBlinkingIcon() : defaultIcon}
        >
          <Popup>
            <strong>{address}</strong> <br />
            {person} <br />
            Severity: {severity}
          </Popup>
        </Marker>

        {/* Safe zone markers - Ensure safeZones is an array and map over it safely */}
        {safeZones.length > 0 && safeZones.map((zone) => (
          <Marker key={zone.id} position={zone.coords} icon={defaultIcon}>
            <Popup>
              <strong>{zone.name}</strong> <br />
              This is a safe zone.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map2;

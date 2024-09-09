import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { locations } from "../../../utils/locations";

function Map() {
  const centerPosition = [28.6139, 77.209];
  const currentDate = new Date();
  const currentDay = currentDate.getFullYear();
  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong> <br />
            Opening Date: <span>{currentDay}</span>
            <br />
            Production Rate: {(Math.random() * 100).toFixed(2)} units/hour{" "}
            <br />
            Operational Efficiency: {(Math.random() * 100).toFixed(2)}%
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

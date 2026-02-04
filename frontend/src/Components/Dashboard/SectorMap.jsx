import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon missing in React Leaflet
// We are using custom icons, but keeping this just in case
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom Icons configuration
const createIcon = (color) => {
    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

const icons = {
    Sequele: createIcon('blue'),
    Kifangondo: createIcon('green'),
    Funda: createIcon('red'),
    'Zona Baia': createIcon('gold')
};

// Labels for Sectors (Center points)
const sectorLabels = [
    { name: "SEQUELE", lat: -8.85500, lng: 13.46000 },
    { name: "KIFANGONDO", lat: -8.76000, lng: 13.42500 },
    { name: "FUNDA", lat: -8.84000, lng: 13.55000 },
    { name: "ZONA BAIA", lat: -8.95500, lng: 13.48000 }
];

// Polygon for Cacuaco/Sequele Boundary (Approximate)
const boundaryCoords = [
    [-8.7500, 13.3800], // NW
    [-8.7500, 13.4500], // N
    [-8.8200, 13.5600], // NE (Funda)
    [-8.9600, 13.5000], // SE
    [-8.9600, 13.4000], // SW
    [-8.8500, 13.3500]  // W
];

const boundaryStyle = {
    color: '#E74C3C', // Red
    weight: 2,
    opacity: 1,
    dashArray: '10, 10', // Dotted/Dashed line
    fill: false // No fill, just outline
};

const hospitalData = [
    // Sequele (Cluster around -8.85, 13.46)
    { name: "Vila Verde Cativa", sector: "Sequele", lat: -8.85932, lng: 13.46389, type: "Hospital" },
    { name: "Centro de Saúde R Sequele", sector: "Sequele", lat: -8.85500, lng: 13.46000, type: "Centro de Saúde" },
    { name: "Posto de Saúde do Mulundo", sector: "Sequele", lat: -8.85000, lng: 13.47000, type: "Posto de Saúde" },

    // Kifangondo (North, approx -8.76, 13.42)
    { name: "Centro de Saúde 22 de Janeiro", sector: "Kifangondo", lat: -8.76028, lng: 13.42690, type: "Centro de Saúde" },
    { name: "Posto de Saúde da Kaop Velha Sul", sector: "Kifangondo", lat: -8.77000, lng: 13.42000, type: "Posto de Saúde" },
    { name: "Centro de Saúde Alto Kifangondo", sector: "Kifangondo", lat: -8.75500, lng: 13.43000, type: "Centro de Saúde" },

    // Funda (East, approx -8.84, 13.54)
    { name: "Centro Materno Infantil da Funda", sector: "Funda", lat: -8.84543, lng: 13.54803, type: "Materno Infantil" },
    { name: "Posto de Saúde da Kilunda", sector: "Funda", lat: -8.83500, lng: 13.55500, type: "Posto de Saúde" },

    // Zona Baia (South/Viana, approx -8.95, 13.48)
    { name: "Centro KM30", sector: "Zona Baia", lat: -8.95735, lng: 13.48001, type: "Centro" },
    { name: "Posto de Saúde Dimba", sector: "Zona Baia", lat: -8.95000, lng: 13.47500, type: "Posto de Saúde" }
];

const SectorMap = () => {
    return (
        <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <MapContainer center={[-8.8500, 13.4800]} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {/* Sector Boundary */}
                <Polygon positions={boundaryCoords} pathOptions={boundaryStyle} />

                {/* Permanent Sector Labels */}
                {sectorLabels.map((label, index) => (
                    <Marker
                        key={`label-${index}`}
                        position={[label.lat, label.lng]}
                        icon={L.divIcon({ className: 'hidden-icon', html: '' })} // Invisible marker
                        opacity={0}
                    >
                        <Tooltip
                            permanent
                            direction="center"
                            className="sector-label-tooltip"
                        >
                            <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#2C3E50', textTransform: 'uppercase' }}>
                                {label.name}
                            </span>
                        </Tooltip>
                    </Marker>
                ))}

                {/* Hospital Markers */}
                {hospitalData.map((hospital, index) => (
                    <Marker
                        key={index}
                        position={[hospital.lat, hospital.lng]}
                        icon={icons[hospital.sector] || icons['Sequele']}
                    >
                        <Popup>
                            <strong>{hospital.name}</strong><br />
                            Sector: {hospital.sector}<br />
                            Tipo: {hospital.type}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Styles for the transparent tooltip */}
            <style>
                {`
                    .leaflet-tooltip.sector-label-tooltip {
                        background-color: transparent;
                        border: none;
                        box-shadow: none;
                    }
                `}
            </style>
        </div>
    );
};

export default SectorMap;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {hospitalData.map((hospital, index) => (
                    <Marker
                        key={index}
                        position={[hospital.lat, hospital.lng]}
                        icon={icons[hospital.sector] || icons['Sequele']} // Default to Sequele (Blue) if sector not matched
                    >
                        <Popup>
                            <strong>{hospital.name}</strong><br />
                            Sector: {hospital.sector}<br />
                            Tipo: {hospital.type}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default SectorMap;

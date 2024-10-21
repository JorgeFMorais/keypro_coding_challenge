import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { fetchPOIs, addPOI, POI } from '../api/poiService.ts';
import POIPopup from './POIPopup.tsx';

/**
 * Map component that displays a map with Points of Interest (POIs).
 * 
 * This component fetches POIs on load and allows users to add new POIs by clicking on the map.
 * 
 * @component
 * @example
 * return (
 *   <Map />
 * )
 * 
 * @returns {JSX.Element} The rendered map component.
 * 
 * @remarks
 * - Uses `useState` to manage the state of POIs.
 * - Uses `useEffect` to fetch POIs when the component loads.
 * - Uses `useMapEvents` to handle map click events for adding new POIs.
 * 
 * @function handleAddMarker
 * @param {number} lat - Latitude of the new marker.
 * @param {number} lon - Longitude of the new marker.
 * 
 * @function MapClickHandler
 * A custom component to handle map click events.
 * 
 * @returns {null} This component does not render anything.
 */
const Map: React.FC = () => {
  // Set up the default icon for markers
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  
  const [pois, setPOIs] = useState<POI[]>([]);

  // Fetch POIs on component load
  useEffect(() => {
    fetchPOIs().then(setPOIs);
  }, []);

  const handleAddMarker = (lat: number, lon: number) => {
    const description = prompt('Enter description:');
    if (description) {
      const newPOI = { lat, lon, description };
      addPOI(newPOI).then(newPOI => {
        setPOIs([...pois, newPOI]);
      });
    }
  };

  // Custom component to handle map click
  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => {
        handleAddMarker(e.latlng.lat, e.latlng.lon);
      },
    });
    return null;
  };

  const position = [40.416775, -3.703790]

  return (
    <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ height: "80vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pois.map((poi, idx) => (
        <Marker key={idx} position={[poi.lat, poi.lon]}>
          <POIPopup poi={poi} />
        </Marker>
      ))}
      <MapClickHandler />
    </MapContainer>
  );
};

export default Map;

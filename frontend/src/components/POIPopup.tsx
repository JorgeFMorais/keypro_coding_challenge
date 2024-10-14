import React from 'react';
import { Popup } from 'react-leaflet';
import { POI, deletePOI } from '../api/poiService.ts';

interface POIPopupProps {
  poi: POI;
}

const POIPopup: React.FC<POIPopupProps> = ({ poi }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this POI?')) {
      deletePOI(poi.id!).then(() => {
        window.location.reload(); // Quick way to refresh the map
      });
    }
  };

  return (
    <Popup>
      <div>
        <h3>{poi.name}</h3>
        Description: {poi.description}<br/>
        Latitude: {poi.lat}<br/>
        Longitude: {poi.lon}<br/><br/>
        <button onClick={handleDelete}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Popup>
  );
};

export default POIPopup;

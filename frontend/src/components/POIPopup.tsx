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
        <h3>{poi.description}</h3>
        <p>Created by: {poi.creator}</p>
        <p>At: {poi.timestamp}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Popup>
  );
};

export default POIPopup;

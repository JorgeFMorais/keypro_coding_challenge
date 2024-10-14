import React, { useState } from 'react';
import { addPOI, POI } from '../api/poiService.ts';

interface POIFormProps {
  onSubmit: (poi: Omit<POI, 'id' | 'creator' | 'timestamp'>) => void;
}

const POIForm: React.FC<POIFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const handleSubmit = () => {
    if (lat && lng && description) {
      onSubmit({ lat, lng, description });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default POIForm;

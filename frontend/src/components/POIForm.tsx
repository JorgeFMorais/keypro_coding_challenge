import React, { useState } from 'react';
import { addPOI, POI } from '../api/poiService.ts';

interface POIFormProps {
  onSubmit: (poi: Omit<POI, 'id' | 'created_at'>) => void;
}

const POIForm: React.FC<POIFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  const handleSubmit = () => {
    if (lat && lon && description) {
      onSubmit({ lat, lon, description });
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

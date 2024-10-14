import axios from 'axios';

export interface POI {
  id: number;
  name: string;
  description: string;
  lat: number;
  lon: number;
  created_at: string;
}

const apiClient = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPOIs = async (): Promise<POI[]> => {
  const response = await apiClient.get<POI[]>('poi/');
  return response.data;
};

export const addPOI = async (poi: Omit<POI, 'id' | 'created_by' | 'created_at'>) => {
  const response = await apiClient.post('poi/', poi);
  return response.data;
};

export const updatePOI = async (id: number, poi: Omit<POI, 'created_by' | 'created_at'>) => {
  const response = await apiClient.put(`poi/${id}/`, poi);
  return response.data;
};

export const deletePOI = async (id: number) => {
  await apiClient.delete(`poi/${id}/`);
};

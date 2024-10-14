import axios from 'axios';

interface AuthResponse {
  token: string;
}

export const login = async (username: string, password: string) => {
  const response = await axios.post<AuthResponse>('/api/auth/login/', { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post<AuthResponse>('/api/auth/register/', { username, password });
  return response.data;
};

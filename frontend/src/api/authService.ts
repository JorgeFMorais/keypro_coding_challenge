import axios from 'axios';

interface AuthResponse {
  access: string;
  refresh: string;
}

export const login = async (email: string, password: string) => {
  const response = await axios.post<AuthResponse>('/api/login/', { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password1: string, password2: string) => {
  const response = await axios.post<AuthResponse>('/api/register/', { username, email, password1, password2 });
  return response.data;
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; 

export const register = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

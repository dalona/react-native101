import axios from 'axios';
import { getToken } from './tokenService';

const API_URL = 'http://localhost:3000/contact'; // Cambia al URL de tu backend

const createHeaders = async () => {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchContacts = async (userId: number) => {
  const headers = await createHeaders();
  const response = await axios.get(`${API_URL}?user=${userId}`, { headers });
  return response.data;
};

export const addContact = async (contact: any) => {
  const headers = await createHeaders();
  const response = await axios.post(API_URL, contact, { headers });
  return response.data;
};

export const updateContact = async (id: number, contact: any) => {
  const headers = await createHeaders();
  const response = await axios.patch(`${API_URL}/${id}`, contact, { headers });
  return response.data;
};

export const deleteContact = async (id: number) => {
  const headers = await createHeaders();
  const response = await axios.delete(`${API_URL}?id=${id}`, { headers });
  return response.data;
};

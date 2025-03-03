import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const getRole = async (id) => {
  try {
    const response = await api.get(`${API_URL}/roles/${id}`);
    console.log(`${API_URL}/roles/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to get role');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get role');
  }
};
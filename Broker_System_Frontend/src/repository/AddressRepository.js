import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const fetchAllAddress = async () => {
  try {
    const response = await api.get(`${API_URL}/address/get`);
    console.log(`${API_URL}/address/get`);
    console.log(response);
    if (!response.data) throw new Error('Failed to fetch address');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch address');
  }
};
//add
export const addAddress = async (addressData) => {
  try {
    const response = await api.post(`${API_URL}/address/create`,addressData);
    console.log(`${API_URL}/address/create`);
    console.log(response);
    if (!response.data) throw new Error('Failed to add address');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to add address');
  }
};
export const getAddress = async (id) => {
  try {
    const response = await api.get(`${API_URL}/address/get/${id}`);
    console.log(`${API_URL}/address/get/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to get Address');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get Address');
  }
};
export const updateAddress = async (id,addressData) => {
  try {
    const response = await api.put(`${API_URL}/address/update/${id}`,addressData);
    console.log(`${API_URL}/address/update/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to update Address');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to update Address');
  }
};

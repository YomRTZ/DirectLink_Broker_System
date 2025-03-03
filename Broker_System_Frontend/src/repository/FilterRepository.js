import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});
export const filterProperties = async () => {
  try {
    
    const response = await api.get(`${API_URL}/filter/properties/`);
    console.log(`${API_URL}/filter/properties/`);
    console.log(response);
    if (!response.data) throw new Error('Failed to filter properties');
    console.log("response.data",response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to filter property');
  }
};
export const filterPropertiesByQuery = async (query) => {
  try {
    
    const queryString = new URLSearchParams(query).toString();
    const response = await api.get(`${API_URL}/filter/properties?${queryString}`);
    console.log("url",`${API_URL}/filter/properties?${queryString}`);
    if (!response.data) throw new Error('Failed to filter properties');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to filter property');
  }
};
import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const fetchAllProperties = async () => {
  try {
    const response = await api.get(`${API_URL}/property/get`);
    console.log(`${API_URL}/property/get`);
    console.log(response);
    if (!response.data) throw new Error('Failed to fetch properties');
    console.log("response.data",response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch proprty');
  }
};
//add
export const addProperty = async (data) => {
  console.log("data",data);
  try {
    const response = await api.post(`${API_URL}/property/create`,data);
    console.log(`${API_URL}/property/create`);   
    if (!response.data) throw new Error('Failed to add properties');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to add proprty');
  }
};
export const getProperty = async (id) => {
  try {
    const response = await api.get(`${API_URL}/property/get/${id}`);
    console.log(`${API_URL}/property/get/${id}`);
    console.log("response.data",response.data);
    if (!response.data) throw new Error('Failed to get property');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get property');
  }
};
export const updateProperty= async(id)=>{
  try {
    const response = await api.get(`${API_URL}/property/update/${id}`);
    console.log(`${API_URL}/property/update/${id}`);
    console.log("response.data",response.data);
    if (!response.data) throw new Error('Failed to update property');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to update property');
  }
}
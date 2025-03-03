import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const fetchAllCategory = async () => {
  try {
    const response = await api.get(`${API_URL}/category/get`);
    console.log(`${API_URL}/category/get`);
    console.log(response);
    if (!response.data) throw new Error('Failed to fetch category');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch category');
  }
};
//add
export const addCategory = async (formData) => {
  try {
    console.log("Sending data to the server:", formData); 
    const response = await api.post(`${API_URL}/category/create`, formData);
    console.log(`${API_URL}/category/create`);
    console.log(response);
    if (!response.data) throw new Error('Failed to add category');
    return response.data;
  } catch (error) {
    console.error("Error while adding category:", error);
    throw new Error(error.message || 'Failed to add category');
  }
};
export const updateCategory = async (id,categoryData) => {
  try {
    const response = await api.put(`${API_URL}/category/update/${id}`,categoryData);
    console.log(`${API_URL}/category/update/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to update Category');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to update Category');
  }
};
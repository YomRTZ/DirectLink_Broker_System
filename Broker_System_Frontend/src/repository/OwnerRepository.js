import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const getOwner = async (id) => {
  try {
    const response = await api.get(`${API_URL}/owner/get/${id}`);
    if (!response.data) throw new Error("Owner data is missing");
    return response.data;
  } catch (error) {
    console.error("Error in getOwner:", error.response?.data || error.message);
    throw new Error(error.message || "Failed to get owner");
  }
};
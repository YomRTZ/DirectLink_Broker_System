import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const AddLeaseAgrement = async (leaseData) => {
    try {
      const response = await api.post(`${API_URL}/lease/create`,leaseData);
      console.log(`${API_URL}/lease/create`);
      console.log(response);
      if (!response.data) throw new Error('Failed to add leases');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to add leases');
    }
  };
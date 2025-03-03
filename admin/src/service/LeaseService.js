import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});
export const addLeaseAgreement = async (leaseAgreementData) => {
  try {
    console.log("atAddLease",leaseAgreementData);
    const response = await api.post(`${API_URL}/leaseAgreement/create`,leaseAgreementData)
    console.log(`${API_URL}/leaseAgreement/create`);
    console.log(response);
    if (!response.data) throw new Error('Failed to add leaseAgreement');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to add leaseAgreement');
  }
};
//get 
export const getAllLeaseAgreement = async () => {
  try {
    const response = await api.get(`${API_URL}/leaseAgreement/get`);
    console.log(`${API_URL}/leaseAgreement/get`);
    console.log(response);
    if (!response.data) throw new Error('Failed to fetch leaseAgreement');
    console.log("response.data",response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch leaseAgreement');
  }
};

//get by id
export const getLeaseAgreement = async (id) => {
  try {
    const response = await api.get(`${API_URL}/leaseAgreement/get/${id}`);
    console.log(`${API_URL}/leaseAgreement/get/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to get leaseAgreement');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get leaseAgreement');
  }
};
//update
export const updateLeaseAgreement = async (id, leaseAgreementData) => {
  try {
    const response = await axios.put(`${API_URL}/leaseAgreement/update/${id}/status`, leaseAgreementData);
    console.log("Update response:", response);
    if (!response.data) throw new Error('Failed to update lease agreement');
    return response.data;
  } catch (error) {
    console.error("Update error:", error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to update lease agreement');
  }
};


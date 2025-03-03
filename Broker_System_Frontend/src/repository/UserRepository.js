import axios from 'axios';
import { API_URL } from '../utiles/Constant';
import React,{ useContext } from 'react';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});
export const getUser = async (id) => {
  try {
    const response = await api.get(`${API_URL}/user/get/${id}`);
    console.log(`${API_URL}/user/get/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to get user');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get user');
  }
};
export const getUserByUid = async (uid) => {
  try {
    const response = await api.get(`${API_URL}/user/getUserByUid`,{params: { uid }});
    console.log(`${API_URL}/user/getUserByUid`);
    console.log(response);
    if (!response.data) throw new Error('Failed to get user');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get user');
  }
};


export const updateUserByid = async (id, data) => {
  if (!id || !data) {
    throw new Error('Invalid parameters: "id" and "data" are required.');
  }

  try {
    const response = await api.put(`${API_URL}/user/update/${id}`, data);
    console.log(`PUT Request to: ${API_URL}/user/update/${id}`);
    console.log('Response:', response);

    if (!response.data) {
      throw new Error('Failed to update user: No data received from the server.');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.message); 
    throw new Error(error.message || 'Failed to update user.');
  }
};

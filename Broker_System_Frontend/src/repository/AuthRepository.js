import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});



export const checkAuthentication = async () => {
  try {
    const response = await api.post(`${API_URL}/auth/authMiddleware`); 
    console.log("ressspoonsee",response.data);
    return response.data;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return { authenticated: false };
  }
};

export const fetchAllRoles = async () => {
  try {
    const response = await fetch(`${API_URL}/roles/all`);
    console.log(`${API_URL}/roles/all`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch roles');
    return data.roles;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch roles');
  }
};

export const signupRequest = async (roleId, uid,email) => {
  try {
    const response = await api.post(`${API_URL}/auth/signup`, { roleId, uid,email });
    return response.data; 
  } catch (error) {
    console.error('Error during signup:', error.response?.data || error.message);
    throw error;
  }
};

export const loginRequest = async (idToken, refreshToken) => {
try {
  const response = await api.post(`${API_URL}/auth/login`, { idToken,refreshToken });
  console.log("response",response);
  console.log("response",response.data);
  return response.data;

} catch (error) {
  console.error('Error during signIn:', error.response?.data || error.message);
  throw error;
}
};

// // export const getProtectedContentRequest = async () => {
// //   const response = await api.get('/protected');
// //   return response.data;
// // };

export const logoutRequest = async () => {
  const response=await api.post(`${API_URL}/auth/logout`);
  console.log(`${API_URL}/auth/logout`);
  console.log(response.data);
  return response.data;
};

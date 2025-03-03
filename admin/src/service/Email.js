import axios from 'axios';
import { API_URL } from '../utiles/Constant';
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
  });

export const sendEmail = async (emailData) => {
    try {
        const response = await api.post(`${API_URL}/email/create`, emailData);
        return response.data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

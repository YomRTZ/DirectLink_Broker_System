import axios from "axios";
import { API_URL } from "../utiles/Constant";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


  export const fetchAllReviews = async ()=> {
    try{
      const response = await api.get(`${API_URL}/review/get`);
      console.log(response);
      return response.data;
    }catch(error){
      console.error(error);
      throw new Error(error.message || "Failed to fetch reviews");
    }
  };
 export const createReview = async (review) =>{
    try{
      const response = await api.post(`${API_URL}/review/create`, review);
      console.log(response);
      return response.data;
    }catch(error){
      console.error(error);
      throw new Error(error.message || "Failed to create review");
    }
  };

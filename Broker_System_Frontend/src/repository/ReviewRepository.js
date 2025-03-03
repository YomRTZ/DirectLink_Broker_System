import { fetchAllReviews, createReview } from "../services/ReviewService";


  export const getAllReviews =async () => {
    try{
      return await fetchAllReviews();
    }catch(error){
      console.error(error);
      throw error;
    }
  };

  export const addReview = async (review) =>{
    try{
      return await createReview(review);
    }catch(error){
      console.error(error);
      throw error;
    }
  };

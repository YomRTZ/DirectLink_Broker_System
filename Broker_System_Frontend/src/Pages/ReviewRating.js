import React, { useState, useEffect, useContext } from "react";
import { getAllReviews, addReview } from "../repository/ReviewRepository";
import { getUsersByUid } from "../services/UserService";
import { AuthContext } from "../context/AuthContext";


const ReviewRating = ({_id}) => {
  const { uid } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  //state to store all reviews
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(" ");

  const [newReview, setNewReview] = useState({});

  useEffect(() => {
    const getCurrentUserData = async () => {
      const response = await getUsersByUid(uid);
      
      setCurrentUser(response);
      console.log("this response", response);
    };
    getCurrentUserData();
  }, []);

  const handleRating = (value) => {
    setRating(value);
  };
  

  useEffect(() => {
    const fetchReviews = async () =>{
      try{
        const data = await getAllReviews();
        setReviews(data);
      }catch(error){
        console.log(error);
      }
    };
    fetchReviews();
  },[]);


  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const secondsAgo = Math.floor((now - new Date(timestamp)) / 1000);
    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  };

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and a review comment.");
      return;
    }
    const newReviewData = {
      // id: reviews.length + 1,
      
      rating: rating,
      comment: review,
      timestamp: new Date().toISOString(),
      // timestamp: new Date(),
      tenantId: currentUser._id,
      propertyId: _id,
      
    };
    // setNewReview(newReviewData);
    // console.log("new review data", newReviewData);
     try {
      const savedReview = await addReview(newReviewData);
      if(savedReview){
        setReviews([...reviews, savedReview]);
        setRating(0);
        setReview("");
      }
      } catch(error){
        throw error;
     }
  }
    return (
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6 h-auto">
        <h2 className="text-xl font-semibold text-gray-900">
          Submit Your Review
        </h2>
        <p className="text-gray-600 text-sm">
          Rate your experience and leave a comment below.
        </p>

        {/* Review Form */}
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <label className="block font-medium text-gray-800">
            Rate Your Experience
          </label>
          <div className="flex gap-1 text-yellow-500 my-2">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={index}
                  className={`text-2xl cursor-pointer ${
                    starValue <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              );
            })}
          </div>

          <label className="block font-medium text-gray-800">
            Write Your Review
          </label>
          <textarea
            className="w-full p-2 border rounded-md mt-2 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your review..."
            rows="3"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={() => {
                setRating(0);
                setReview("");
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Display Submitted Reviews */}
        <div className="mt-6">
          <p className="font-bold">
            Reviews
          </p>
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-t pt-4 mt-4">
                <div className="flex gap-3">
                  <div>
                    <h3 className="text-md font-medium">{}</h3>
                    <p className="text-sm text-gray-500">
                      {getTimeAgo(review.timestamp)}
                    </p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };


export default ReviewRating;

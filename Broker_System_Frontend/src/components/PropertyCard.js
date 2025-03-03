import React, { useState, useEffect } from "react";
import { Card, Button } from "flowbite-react";
import { GiMoneyStack } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import { FaBed, FaBath, FaRulerCombined, FaHeart , FaDoorClosed} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PropertyCard({ _id, ownerId, Type, houseImage, city, subCity, district, title, numberOfBedRooms, numberOfBathRooms, houseSize, rentalPrice }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  // Check if property is favorited on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorited(favorites.some(fav => fav._id === _id));
  }, [_id]);

  const handleDetails = async () => {
    navigate("/propertyDetailPage", { state: { ownerId, _id } })
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav._id !== _id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const propertyData = {
        _id,
        ownerId,
        Type,
        houseImage,
        city,
        subCity,
        district,
        title,
        numberOfBedRooms,
        numberOfBathRooms,
        houseSize,
        rentalPrice
      };
      localStorage.setItem('favorites', JSON.stringify([...favorites, propertyData]));
    }
    
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className="relative max-w-sm bg-gray-100/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 
      hover:transform hover:scale-[1.02] hover:shadow-xl border border-gray-600/50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={handleFavorite}
          className="bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
          title="Add to Favorites"
        >
          <FaHeart
            className={`${isFavorited ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
            size={16}
          />
        </button>
      </div>

      <div className="relative overflow-hidden">
        {houseImage && houseImage.length > 0 ? (
          <img
            src={houseImage.split(',')[0]}
            alt="House Image"
            className="w-full h-56 object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-56 bg-gray-200/80 flex items-center justify-center text-gray-600">
            Loading image...
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {Type}
          </span>
        </div>
      </div>

      <div className="p-5 text-gray-800">
        <div className="flex items-center space-x-2 mb-3">
          <GiMoneyStack className="text-gray-700 text-2xl" />
          <span className="text-xl font-bold text-gray-700">
            ETB {rentalPrice}
          </span>
        </div>

        <div className="flex items-center space-x-1 text-gray-700 mb-4">
          <CiLocationOn className="text-gray-700 text-xl" />
          <p className="text-sm">
            {city}, {subCity}, {district}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-600/50">
          <div className="flex flex-col items-center text-center">
            <FaRulerCombined className="text-gray-700 text-lg mb-1" />
            <span className="text-sm text-gray-700">{houseSize} m²</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaBed className="text-gray-700 text-lg mb-1" />
            <span className="text-sm text-gray-700">{numberOfBedRooms} Beds</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaBath className="text-gray-700 text-lg mb-1" />
            <span className="text-sm text-gray-700">{numberOfBathRooms} Baths</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDetails}
            className="bg-emerald-500/90 hover:bg-emerald-600/90 text-white px-6 py-2 rounded-lg 
            transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20
            focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transform hover:scale-105"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;



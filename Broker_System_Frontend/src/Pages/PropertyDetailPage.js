import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { useLocation } from "react-router-dom";
import { getUserById, getUsersByUid } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBed,
  FaBath,
  FaRegDotCircle,
  FaDoorClosed ,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineSquareFoot } from "react-icons/md";
import { getPropertyById } from "../services/PropertyService";
import { PopOver } from "../components/PopOver";
import ReviewRating from "./ReviewRating";
const PropertyDetailPage = () => {
  const [currentUserData, setCurrentUserData] = useState("");
  const [ownerUserData, setOwnerUserData] = useState("");
  const [propertyData, setPropertyData] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [ownerData, setOwnerData] = useState(null);
  const { dispatch } = useContext(ChatContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { uid } = useContext(AuthContext);
  const { ownerId, _id } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const sliderSettingsSmallScreen = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getFirstImageUrl = (imageString) => {
    if (!imageString) return null;
    const images = imageString.split(",");
    if (images.length > 0) {
      const firstImage = images[0].trim();
      return firstImage.startsWith("http")
        ? firstImage
        : `http://localhost:3000${firstImage}`;
    }
    return null;
  };

  const getRemainingImages = (imageString) => {
    if (!imageString) return [];
    const images = imageString.split(",");
    return images.slice(1).map((img) => {
      const trimmed = img.trim();
      return trimmed.startsWith("http")
        ? trimmed
        : `http://localhost:3000${trimmed}`;
    });
  };

  useEffect(() => {
    const handleData = async () => {
      const property = await getPropertyById(_id);
      setPropertyData(property);
      console.log("Property Images:", property.houseImage);
      console.log("First Image:", getFirstImageUrl(property.houseImage));
      const userData = await getUserById(ownerId);
      setOwnerUserData(userData);
      console.log("userData", userData.uid);
      console.log("userData", userData.profilePicture);
      const CuserData = await getUsersByUid(uid);
      setCurrentUserData(CuserData);
      console.log("current user which is initiate the chat", CuserData);
      const owner = {
        uid: userData.uid,
        displayName: `${userData.firstName} ${userData.middleName} ${userData.lastName}`,
        photoURL: userData.profilePicture || "",
      };
      console.log("ownerData", owner);
      dispatch({
        type: "CHANGE_USER",
        payload: owner,
      });
    };

    handleData();
  }, [setPropertyData, setOwnerUserData]);

  const handleRent = () => {
    navigate("/form", {
      state: { ownerUserData, currentUserData, propertyData },
    });
  };
  const handleChat = () => {
    try {
      if (currentUserData.firstName) {
        navigate("/chat");
      } else {
        setShowPopover(true);
      }
    } catch (error) {
      console.error("Error handling chat action:", error);
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  if (!propertyData || !ownerUserData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Full screen view"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6 relative">
        {/* For small screen slider */}
        <div className="md:hidden">
          {propertyData && propertyData.houseImage ? (
            <Slider {...sliderSettingsSmallScreen}>
              {/* First Image */}
              <div
                className="relative aspect-w-16 aspect-h-9 cursor-pointer"
                onClick={() =>
                  handleImageClick(getFirstImageUrl(propertyData.houseImage))
                }
              >
                <img
                  src={getFirstImageUrl(propertyData.houseImage)}
                  alt="Main Property Image"
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                  }}
                />
              </div>

              {/* Remaining Images */}
              {getRemainingImages(propertyData.houseImage).map(
                (imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-w-16 aspect-h-9 cursor-pointer"
                    onClick={() => handleImageClick(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Property Slide ${index + 2}`}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        console.error("Image failed to load:", e.target.src);
                      }}
                    />
                  </div>
                )
              )}
            </Slider>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-2 h-[500px]">
            {propertyData && propertyData.houseImage ? (
              <>
                {/* First Image - Large */}
                <div
                  className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
                  onClick={() =>
                    handleImageClick(getFirstImageUrl(propertyData.houseImage))
                  }
                >
                  <img
                    src={getFirstImageUrl(propertyData.houseImage)}
                    alt="Main Property Image"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      console.error("Image failed to load:", e.target.src);
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                </div>

                {/* Remaining Images */}
                {getRemainingImages(propertyData.houseImage)
                  .slice(0, 4)
                  .map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden group cursor-pointer"
                      onClick={() => handleImageClick(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Property Image ${index + 2}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          console.error("Image failed to load:", e.target.src);
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                    </div>
                  ))}
              </>
            ) : (
              <div className="col-span-4 flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="p-6 mb-6 md:w-4/6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {propertyData.categoryId.type}
          </h2>
          <p className="text-xl font-semibold text-green-600 mb-4">
            Birr {propertyData.rentalPrice} / month
          </p>
          <div className="flex items-center mb-6">
            <FaMapMarkerAlt className="text-green-600 mr-2" size={20} />
            <span className="text-gray-600">
              {propertyData.addressId.city}, {propertyData.addressId.subCity},{" "}
              {propertyData.addressId.district}
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3">
            <li className="flex items-center gap-1">
              <FaBed className="text-green-600 mr-2 " size={20} />
              {propertyData.numberOfBedRooms} Bedrooms
            </li>
            <li className="flex items-center gap-1">
              <FaBath className="text-green-600 mr-2" size={20} />
              {propertyData.numberOfBathRooms} Bathrooms
            </li>
            <li className="flex items-center gap-1">
              <MdOutlineSquareFoot className="text-green-600 mr-2" size={20} />
              {propertyData.houseSize} sq ft
            </li>
          </ul>
          <p className="text-gray-600 mb-4">{propertyData.description}</p>
          <h3 className="text-lg font-bold mb-4 text-gray-800">Amenities</h3>
          <div className="grid grid-cols-2 gap-4">
            {propertyData.categoryId.amenities.map((amenity, index) => (
              <span key={index} className="flex items-center">
                <FaRegDotCircle className="text-green-500 mr-2" size={16} />
                {amenity}
              </span>
            ))}
          </div>
        </div>
       
        <div className="bg-white rounded-lg shadow-lg p-6 md:w-2/6 h-56">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            Contact Owner
          </h3>
          <div className="">
            <button
              onClick={handleChat}
              className="border border-green-600 text-green-600 py-2 px-4 rounded-md hover:bg-green-600 hover:text-white w-full md:full"
            >
              Send Message
            </button>
            {showPopover && (
              <PopOver message="Please complete your personal details to proceed." />
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 md:w-2/6 h-56">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            Rent This Property
          </h3>
          <div className="">
            <button
              onClick={handleRent}
              className="border border-green-600 text-green-600 py-2 px-4 rounded-md hover:bg-green-600 hover:text-white w-full md:full"
            >
              Rent
            </button>
          </div>
        </div>
      </div>
      <div className="">
          <ReviewRating propertyId= {_id}/>
          </div>
    </div>
  );
};

export default PropertyDetailPage;

import React, { useState } from "react";
import { Card, Button } from "flowbite-react";
import { GiMoneyStack } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import { FaBed, FaBath,FaDoorClosed,FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function PropertyUpdateCard({ _id,ownerId,Type,houseImage, city,subCity,district,title,numberOfBedRooms,numberOfBathRooms,houseSize,rentalPrice }) {
  const [isHovered, setIsHovered] = useState(false);
console.log("image",houseImage);
const navigate = useNavigate();
  const handleUpdate = async () => {
    navigate("/updateProperty", { state: { ownerId, _id } })
  };
  const handleDelete = async () => {
    
  };
  return (
    <div
      className={` relative max-w-sm m-2 rounded-lg overflow-hidden transition-transform transform  ${
        isHovered ? "shadow-xl scale-105" : "shadow-md"
      }  duration-300 ease-in-out bg-[rgb(247,247,246)] border border-[#47663B]  h-auto`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
   {houseImage && houseImage.length > 0 ? (
  <img
    src={houseImage.split(',')[0]} 
    alt="House Image"
    className="w-full h-52 object-cover object-center"
  />
) : (
  <p>Loading image...</p>
)}
      <div className="p-4">
        <h2 className="text-green-500 font-semibold text-xl flex flex-row items-center ">
          <GiMoneyStack className="mr-2" />
          {rentalPrice}
        </h2>
        <h3 className="text-green-950  font-semibold text-xl ">
          {Type}
        </h3>
        <div className="flex flex-row items-center gap-1  text-md py-1">
          <span>
            <CiLocationOn className="text-green-500 " />
          </span>
          <p> {city}</p>
          <p>{subCity}</p>
          <p>{district}</p>
        </div>
        <div className="flex flex-row items-center  text-[#47663B] text-lg justify-between mt-2">
          <div className="flex flex-row items-center gap-1">
            <span className="text-green-500">📐</span>
            <span>{houseSize}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span>
              <FaBed className="text-green-600 text-xl" />
            </span>

            <span>{numberOfBedRooms} Beds</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span>
              <FaDoorClosed className="text-green-600 text-xl" />
            </span>
            <span>{numberOfBathRooms} Baths</span>
          </div>
       
        </div>
      </div>
     <div className="flex flex-row justify-between m-4">
     <Button
          className=" w-1/3  bg-green-500 text-[#E8ECD7] hover:bg-[#1F4529] hover:text-[#EED3B1]"
         onClick={handleUpdate}
        >
       <FaEdit/>
        </Button>
        <Button
          className=" w-1/3 bg-green-500 text-[#E8ECD7] hover:bg-[#1F4529] hover:text-[#EED3B1]"
         onClick={handleDelete}
        >
         <FaTrashAlt/>
        </Button>
     </div>
    </div>
  );
}

export default PropertyUpdateCard;



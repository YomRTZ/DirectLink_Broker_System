import { CategoryUpdate } from "../../services/CategoryService";
import React, { useEffect, useState } from "react";
import AddProperty from "./AddProperty";
import { useProperty } from "../../context/PropertyContext";

export default function UpdateCategory({id,type,residentialTypeUnit,amenities}) {
  const [formData, setFormData] = useState({
   type: "", 
    residentialTypeUnit: "", 
    amenities: [], 
  });
    useEffect(() => {
      setFormData({
        type: type || "",
        residentialTypeUnit:residentialTypeUnit || "",
        amenities: amenities || []
      });
    }, [type,residentialTypeUnit,amenities]);
    
  const { setProperty } = useProperty();
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const newAmenities = checked
        ? [...prevFormData.amenities, value] 
        : prevFormData.amenities.filter((amenity) => amenity !== value); 

      return {
        ...prevFormData,
        amenities: newAmenities,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Final form data:", formData);
      const validFormData = {
        ...formData,
        amenities: Array.isArray(formData.amenities) ? formData.amenities : [],
      };
      const response = await CategoryUpdate(id,validFormData);
      setFormData({
        type: "", 
        residentialTypeUnit: "", 
        amenities: [], 
      })
      console.log("categoryId",response._id);
      setProperty("categoryId",response._id);
    } catch (error) {
      console.error("Error submitting property data:", error);
      alert("Error submitting property data.");
    }
  };
  return (
    <div>
      <h1 className="text-[#42484B] font-semibold text-2xl my-8">Category</h1>
      <div className="bg-white p-6 text-[#42484B]">
        <div>
          <label
            htmlFor="categoryType"
            className="block text-sm font-medium text-[#42484B]"
          >
            Home Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.categoryType}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full text-[#42484B]"
          >
            <option value="" disabled>
              Choose the type of your home
            </option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Condominium">Condominium</option>
          </select>
        </div>
        <div className="mt-6">
          <label
            htmlFor="residentialTypeUnit"
            className="block text-sm font-medium text-[#42484B]"
          >
            Residential Type Unit
          </label>
          <select
            id="residentialTypeUnit"
            name="residentialTypeUnit"
            value={formData.residentialTypeUnit}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full text-[#42484B]"
          >
            <option value="" disabled>
              Choose the residential type unit
            </option>
            <option value="New">New</option>
            <option value="Old">Old</option>
          </select>
        </div>
        <div className="mt-6">
          <span className="font-semibold">Select the amenities your property offers:</span>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              "Air Conditioning",
              "Balcony",
              "Parking",
              "Swimming Pool",
              "Fireplace",
              "Storage",
              "Garden",
              "Security",
              "Internet",
              "Cable TV",
              "Elevator",
              "Gym",
              "Laundry",
              "Dishwasher",
              "Fridge",
              "Oven",
              "Microwave",
            ].map((amenity) => (
              <div key={amenity}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    onChange={handleAmenitiesChange}
                    className="mr-2"
                    checked={formData.amenities.includes(amenity)}
                  />
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
        >
          Update
        </button>
      </div>
    </div>
  );
}

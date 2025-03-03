import React, { useState } from "react";
import { getFilteredProperties } from "../services/FilterService";
const Filter = ({onFilter}) => {
const [error,setError] = useState(null);
const [filters, setFilters] = useState({
    category: "",
    propertySize: "",
    minPrice: " ", 
    maxPrice: " ",
    minBedroom: " ",
    maxBedroom: " ",
    minBathroom: " ",
    maxBathroom: " ",
  });
     
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const getFirstImageUrl = (imageString) => {
    if (!imageString) return null;
    if (imageString.length > 0) {
      const firstImage = imageString[0].trim();
      return firstImage.startsWith("http")
        ? firstImage
        : `http://localhost:3000${firstImage}`;
    }
    return null;
  };
  const applyFilter = async () => {
    console.log(filters);
    try{
    const response = await getFilteredProperties(filters);
    console.log("filter response",response.data);
    response.data.forEach((property) => {
      const houseImage = getFirstImageUrl(property.houseImage);
       property.houseImage = houseImage;
       const filteredData = [];
        filteredData.push({
        _id: property._id,
        propertyId: property._id,
        categoryId: property.categoryId,
        ownerId: property.ownerId,
        addressId: property.addressId,
        description: property.description,
        rentalPrice: property.rentalPrice,
        numberOfBedRooms: property.numberOfBedRooms,
        numberOfBathRooms:  property.numberOfBathRooms,
        houseSize: property.houseSize,
        numberOfRooms: property.numberOfRooms,
        houseImage: houseImage,
       });
      console.log("data",filteredData);
        onFilter(filteredData);
    });
    setFilters({category: "",
      propertySize: "",
      minPrice: "",
      maxPrice: "",
      minBedroom: "",
      maxBedroom: "",
      minBathroom: "",
      maxBathroom: "",})
    }catch(error){
      setError(error.message);
    }

  };

  return (
    <div className="bg-black/80 backdrop-blur-sm p-6 w-full sm:w-64 sm:static top-0 left-0 ml-3 text-white/95 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-white tracking-wide uppercase relative">
        <span className="relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/3 after:h-1 after:bg-emerald-500/50 after:rounded-full">
          Filter Rentals
        </span>
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-white/90">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
            hover:bg-gray-800/80 transition-all duration-300"
          >
            <option value="" disabled>Select category</option>
            <option value="apartment">Apartment</option>
            <option value="house">TownHouse</option>
            <option value="villa">Villa</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-white/90">Property Size</label>
          <input
              type="number"
              name="propertySize"
              value={filters.propertySize}
              onChange={handleInputChange}
              placeholder="Property Size"
              className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
              hover:bg-gray-800/80 transition-all duration-300 placeholder-white/50"
            />
        </div>

       

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
              hover:bg-gray-800/80 transition-all duration-300 placeholder-white/50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
              hover:bg-gray-800/80 transition-all duration-300 placeholder-white/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">Min Bedroom</label>
            <input
              type="number"
              name="minBedroom"
              value={filters.minBedroom}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
              hover:bg-gray-800/80 transition-all duration-300 placeholder-white/50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">Max Bedroom</label>
            <input
              type="number"
              name="maxBedroom"
              value={filters.maxBedroom}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
              hover:bg-gray-800/80 transition-all duration-300 placeholder-white/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">Min Bathroom</label>
            <input
              type="number"
              name="minBathroom"
              value={filters.minBathroom}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
              hover:bg-gray-800/80 transition-all duration-300 placeholder-white/50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">Max Bathroom</label>
            <input
              type="number"
              name="maxBathroom"
              value={filters.maxBathroom}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full px-4 py-2 bg-gray-900/70 text-white/90 border border-gray-700/50 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40
              hover:bg-gray-800/80 transition-all duration-300 placeholder-white/50"
            />
          </div>
        </div>
      </div>

      <button
        onClick={applyFilter}
        className="w-full mt-8 py-3 bg-emerald-500/90 hover:bg-emerald-600/90 text-white font-semibold rounded-lg 
        transition-all duration-300 text-sm shadow-lg hover:shadow-emerald-500/20
        focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      >
        Apply Filter
      </button>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default Filter;

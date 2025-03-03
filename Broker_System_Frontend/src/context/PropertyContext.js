import React, { createContext, useContext, useState } from "react";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [addressId, setAddressId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const setProperty = (key, value) => {
    if (key === "addressId") setAddressId(value);
    if (key === "categoryId") setCategoryId(value);
  };

  return (
    <PropertyContext.Provider value={{ addressId, categoryId, setProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook for using the Property Context
export const useProperty = () => useContext(PropertyContext);

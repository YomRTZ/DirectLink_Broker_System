import React,{createContext, useState} from "react";

export const PropertyDataContext=createContext();
export const PropertyDataProvider=({children})=>{
    const [propertyData, setPropertyData] = useState(null);
    const [ownerUserData, setOwnerUserData] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);
    const value = {
        propertyData,
        setPropertyData,
        ownerUserData,
        setOwnerUserData,
        currentUserData,
        setCurrentUserData,
      };
      return (
        <PropertyDataContext.Provider value={value}>
          {children}
        </PropertyDataContext.Provider>
      );
}
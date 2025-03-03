import { getProperties } from "../../services/PropertyService";
import React, { useContext, useEffect, useState } from "react";
import PropertyUpdateCard from "./PropertyUpdateCard";
import { AuthContext } from "../../context/AuthContext";

export default function Property() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        const ownerProperties = data.filter(property => property?.ownerId?.uid === uid);
        setProperties(ownerProperties);
        console.log("owner properties",data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [uid]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg text-gray-600">Loading properties...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-1 flex-col md:flex-row pt-2 mx-auto gap-6 px-4 w-full">
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyUpdateCard
                key={property._id}
                _id={property._id}
                ownerId={property.ownerId._id}
                houseImage={property.houseImage}
                city={property.addressId.city}
                subCity={property.addressId.subCity}
                district={property.addressId.district}
                type={property.type}
                status={property.status}
                numberOfBedRooms={property.numberOfBedRooms}
                houseSize={property.houseSize}
                numberOfBathRooms={property.numberOfBathRooms}
                rentalPrice={property.rentalPrice}
                Type={property.categoryId.type}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <div className="text-lg text-gray-600">No properties found for this owner.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

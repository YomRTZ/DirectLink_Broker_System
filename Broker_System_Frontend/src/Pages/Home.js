import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { getProperties } from "../services/PropertyService";
import Filter from "../components/Filter";
function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
        console.log("properties", data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
  const handleFilter = (filteredData) => {
    setProperties(filteredData);  
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 flex-col md:flex-row pt-20 mx-auto gap-6 px-4 w-full">
        <aside className="w-full md:w-1/4">
          <Filter onFilter={handleFilter}/>
        </aside>
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard
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
            <div>No properties found.</div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { getPropertyById } from '../services/PropertyService';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavoriteProperties = async () => {
    try {
      setLoading(true);
      // Get favorite IDs from localStorage
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      if (storedFavorites.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      // Fetch full property data for each favorite
      const favoriteProperties = await Promise.all(
        storedFavorites.map(async (favorite) => {
          try {
            const propertyData = await getPropertyById(favorite._id);
            return propertyData;
          } catch (error) {
            console.error(`Error fetching property ${favorite._id}:`, error);
            return null;
          }
        })
      );

      // Filter out any null results from failed fetches
      const validProperties = favoriteProperties.filter(property => property !== null);
      console.log('Fetched favorite properties:', validProperties);
      
      setFavorites(validProperties);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to load favorite properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteProperties();
    window.addEventListener('favoritesUpdated', fetchFavoriteProperties);
    
    return () => {
      window.removeEventListener('favoritesUpdated', fetchFavoriteProperties);
    };
  }, []);

  const handleRemoveFavorite = (propertyId) => {
    try {
      // Get current favorites from localStorage
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      // Remove the property from stored favorites
      const updatedFavorites = storedFavorites.filter(fav => fav._id !== propertyId);
      
      // Update localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Update state to remove the property
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== propertyId));
      
      // Dispatch event to update other components
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleRemoveAll = () => {
    try {
      // Clear all favorites from localStorage
      localStorage.setItem('favorites', JSON.stringify([]));
      
      // Clear favorites from state
      setFavorites([]);
      
      // Dispatch event to update other components
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (error) {
      console.error('Error removing all favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Favorites</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Favorites</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FaHeart className="text-gray-400 text-5xl mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              You haven't added any properties to your favorites yet.
            </p>
            <p className="text-gray-500 mt-2">
              Click the heart icon on any property to add it to your favorites.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Favorites ({favorites.length})
          </h1>
          <button
            onClick={handleRemoveAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash size={16} />
            Remove All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <div key={property._id} className="relative group">
              <PropertyCard
                _id={property._id}
                ownerId={property.ownerId}
                Type={property.categoryId.type}
                houseImage={property.houseImage}
                city={property.addressId.city}
                subCity={property.addressId.subCity}
                district={property.addressId.district}
                numberOfBedRooms={property.numberOfBedRooms}
                numberOfBathRooms={property.numberOfBathRooms}
                houseSize={property.houseSize}
                rentalPrice={property.rentalPrice}
              />
              <button
                onClick={() => handleRemoveFavorite(property._id)}
                className="absolute top-4 right-4 bg-red-500/90 text-white p-2 rounded-full shadow-lg 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600/90"
                title="Remove from favorites"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite; 
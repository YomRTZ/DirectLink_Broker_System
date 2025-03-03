import { addAddressToDatabase } from '../../services/AddressService';
import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import '../../i18n';
import { useTranslation } from 'react-i18next';

export default function AddAddress() {
  const { setProperty } = useProperty();
  const { t } = useTranslation();
  const [addressData, setAddressData] = useState({
    city: '',
    subcity: '',
    district: '',
    locality: '',
    streetNumber: '',
    postalCode: '',
    streetName: '',
    region: '',
    subregion: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAddressToDatabase(addressData);
      console.log("addressId",response._id);
      setProperty('addressId', response._id);
      setAddressData({
        city: '',
        subcity: '',
        district: '',
        locality: '',
        streetNumber: '',
        postalCode: '',
        streetName: '',
        region: '',
        subregion: '',
      });
    } catch (error) {
      console.error(
        'Error creating address:', error);
      setErrorMessage(
        error.response?.data?.message ||   'Error creating address. Please try again.'
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('Add Address')} </h1>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded border border-red-300">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(addressData).map((field) => (
          <div key={field} className="flex flex-col">
            <label
              htmlFor={field}
              className="text-gray-700 font-medium mb-2 capitalize"
            >
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={addressData[field]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-medium py-3 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
           {t('Submit')}
          </button>
        </div>
      </form>
    </div>
  );
}

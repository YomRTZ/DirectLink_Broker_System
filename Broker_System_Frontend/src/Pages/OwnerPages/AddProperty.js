import React, { useContext, useEffect, useState } from "react";
import { FaBed, FaBath,FaDoorClosed } from "react-icons/fa";
import ImageUploader from "../../components/ImageUploader";
import { addProperties } from "../../services/PropertyService";
import { AuthContext } from "../../context/AuthContext";
import { useProperty } from "../../context/PropertyContext";
import AddCategory from "./AddCategory";
import AddAddress from "./AddAddress";
import { getUsersByUid } from "../../services/UserService";
import '../../i18n';
import { useTranslation } from 'react-i18next';
const AddProperty = () => {
  const { uid } = useContext(AuthContext);
  const { addressId, categoryId } = useProperty();
  const { t, i18n } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(" ");
  const [formData, setFormData] = useState({
    rentalPrice: "",
    status: "",
    houseSize: 0,
    numberOfBedRooms: 0,
    numberOfBathRooms: 0,
    negotiationStatus: "",
    numberOfRooms: 0,
    description: "",
  });
  useEffect(() => {
    const getCurrentUserData = async () => {
      const response = await getUsersByUid(uid);
      setCurrentUser(response._id);
    };
    getCurrentUserData();
  }, []);
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);  
  };
  const [validationErrors, setValidationErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const handleImagesChange = (fieldName, images) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: images,
    }));
  };
  const handleIncrement = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field] + 1,
    }));
  };

  const handleDecrement = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field] > 0 ? prevData[field] - 1 : 0,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.rentalPrice || isNaN(formData.rentalPrice)) {
      errors.rentalPrice = "Rental Price must be a valid number.";
    }

    if (!formData.status) errors.status = "Status is required.";

    if (!formData.houseSize) errors.houseSize = "House Size is required.";
    if (!formData.ownershipMap)
      errors.ownershipMap = "Ownership Map is required.";
    if (!formData.houseImage.length) {
      errors.houseImage = "At least one house image is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append images
   formData?.houseImage?.forEach((image, index) => {
      data.append("houseImage", image);
    });
    formData?.ownershipMap?.forEach((image, index) => {
      data.append("ownershipMap", image);
    });
    
    formData?.undocumentedOwnershipProof?.forEach((map) => {
      data.append("undocumentedOwnershipProof", map);
    });
    formData?.residentialHouseId?.forEach((map) => {
      data.append("residentialHouseId", map);
    });
    formData?.ownershipProof?.forEach((map) => {
      data.append("ownershipProof", map);
    });
    formData?.judicialSaleDeed?.forEach((map) => {
      data.append("judicialSaleDeed", map);
    });
    formData?.inheritanceProof?.forEach((map) => {
      data.append("inheritanceProof", map);
    });
 
    data.append("rentalPrice", formData.rentalPrice);
    data.append("status", formData.status);
    data.append("houseSize", formData.houseSize);
    data.append("numberOfBedRooms", formData.numberOfBedRooms);
    data.append("numberOfBathRooms", formData.numberOfBathRooms);
    data.append("description", formData.description);
    data.append("ownerId", currentUser);
    data.append("addressId", addressId);
    data.append("categoryId", categoryId);
    data.append("numberOfRooms", formData.numberOfRooms);
    data.append("negotiationStatus", formData.negotiationStatus);
    
    try {
      console.log("ownerId",currentUser);
      console.log("addressId",addressId);
      console.log("categoryId",categoryId);
      console.log("click",data);
      const response = await addProperties(data);
   setFormData({
    rentalPrice: "",
    status: "",
    houseSize: 0,
    numberOfBedRooms: 0,
    numberOfBathRooms: 0,
    negotiationStatus: "",
    numberOfRooms: 0,
    description: "",
    houseImage:[],
    ownershipMap:[],
    undocumentedOwnershipProof:[],
    residentialHouseId:[],
    ownershipProof:[],
    inheritanceProof:[]
   })
      setStatusMessage("Property added successfully!");
    } catch (error) {
      console.error("Error adding property:", error);
      setStatusMessage("Failed to add property.");
    }
  };

  return (
    <div>
      <div className="bg-[#F0F0F7] pt-10 px-16 ">
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('am')}>አማርኛ</button>
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          {t("Add Our New Property")}
        </h2>
        <div>
          <AddCategory />
        </div>
        <div>
          <AddAddress />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-[#42484B] font-bold text-2xl mb-6">
              {t("Description")}
            </h1>

            <div className="bg-white p-6">
              <span className="mb-4 font-semibold text-[#42484B]">
                {t("ADD YOUR HOME")}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Approximate square footage */}
                <div>
                  <label
                    htmlFor="houseSize"
                    className="block text-sm font-medium text-[#42484B]"
                  >
                 {t("Approximate square footage")}   
                  </label>
                  <input
                    id="houseSize"
                    type="number"
                    name="houseSize"
                    value={formData.houseSize}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full text-[#42484B]"
                  />
                  {validationErrors.houseSize && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.houseSize}
                    </p>
                  )}
                </div>
              </div>

              {/* House bed and bath */}
              <div className="flex flex-row justify-start gap-24 mt-8">
                <div className="flex flex-col items-center">
                  <FaBed className="text-green-600 text-xl" />
                  <span className="font-semibold text-gray-700">{t("Bedrooms")} </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                      onClick={() => handleDecrement("numberOfBedRooms")}
                    >
                      -
                    </button>
                    <span>{formData.numberOfBedRooms}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                      onClick={() => handleIncrement("numberOfBedRooms")}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <FaBath className="text-green-600 text-xl" />
                  <span className="font-semibold text-gray-700">{t("Bathrooms")}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                      onClick={() => handleDecrement("numberOfBathRooms")}
                    >
                      -
                    </button>
                    <span>{formData.numberOfBathRooms}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                      onClick={() => handleIncrement("numberOfBathRooms")}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <FaBath className="text-green-600 text-xl" />
                  <span className="font-semibold text-gray-700">{t("NumberOfRooms")}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                      onClick={() => handleDecrement("numberOfRooms")}
                    >
                      -
                    </button>
                    <span>{formData.numberOfRooms}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                      onClick={() => handleIncrement("numberOfRooms")}
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            </div>



            {/* Rental Price */}
            <div>
              <h1 className="text-[#42484B] font-semibold text-2xl my-8">
              {t("Pricing")} 
              </h1>
              <div className="bg-white p-6 text-[#42484B]">
                <span className="font-semibold">
                {t("LET US KNOW THE FAIR MARKET VALUE TODAY")} 
                </span>
                <label
                  htmlFor="rentalPrice"
                  className="block text-sm font-medium text-gray-600 mt-4"
                >
                                {t("Rental Price")} 
                                
                </label>
                <input
                  id="rentalPrice"
                  type="text"
                  name="rentalPrice"
                  value={formData.rentalPrice}
                  onChange={handleInputChange}
                  placeholder="Let us know the fair market value"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
                {validationErrors.rentalPrice && (
                  <p className="text-red-500 text-xs">
                    {validationErrors.rentalPrice}
                  </p>
                )}
              </div>
            </div>
            {/* discription */}
            <div>
              <h1 className="text-[#42484B] font-semibold text-2xl my-8">
              {t("Description")} 
              </h1>
              <div className="bg-white p-6 text-[#42484B]">
                <span className="font-semibold">{t("YOUR HOME")} </span>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600 mt-4"
                >
                   {t("Description")} 
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Let us know the fair market value"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>
            {/* House Image */}
            <div>
              <h1 className="text-[#42484B] font-semibold text-2xl my-7">
              {t("Photos")}
              </h1>
              <div className="bg-white p-6">
                <span className="block text-sm font-semibold text-gray-600 py-3">
                {t("ADD A FEW HOUSES")}
                
                </span>
                <ImageUploader
                  key={formData.houseImage}
                  fieldName="houseImage"
                  onImageChange={handleImagesChange}
                  images={formData.houseImage}
                />
                {validationErrors.houseImage && (
                  <p className="text-red-500 text-xs">
                    {validationErrors.houseImage}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <h1 className="text-[#42484B] font-semibold text-2xl my-7">
              {t("Status")}
              
              </h1>
              <div className="bg-white p-6 text-[#42484B]">
                <div className="mb-6">
                  <label className="block text-sm font-semibold">{t("Status")}</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="" disabled>
                    {t("Select status")}
                    </option>
                    <option value="Available">{t("Available")} </option>
                    <option value="Rented">{t("Rented")} </option>
                    <option value="Under Maintenance">{t("Under Maintenance")}</option>
                  </select>
                  {validationErrors.status && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.status}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="negotiationStatus"
                    className="block text-sm font-semibold"
                  >
                    {t("NEGOTIATION STATUS")}
                  </label>
                  <select
                    name="negotiationStatus"
                    value={formData.negotiationStatus}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="" disabled>
                    {t("Select negotiation status")}
                    </option>
                    <option value="yes">{t("Yes")}</option>
                    <option value="no">{t("No")}</option>
                  </select>
                </div>
              </div>
            </div>

            <h3 className="text-[#42484B] font-semibold text-2xl my-7">
            {t("Ownership Documents")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6">
              <div>
                <h4 className="block text-sm font-medium text-gray-600">
                {t("Ownership Map")}
                </h4>
                <ImageUploader
                  key={formData.ownershipMap}
                  fieldName="ownershipMap"
                  onImageChange={handleImagesChange}
                  images={formData.ownershipMap}
                />
                {validationErrors.ownershipMap && (
                  <p className="text-red-500 text-xs">
                    {validationErrors.ownershipMap}
                  </p>
                )}
              </div>
              <div>
                <h4 className="block text-sm font-medium text-gray-600">
                {t("Undocumented Ownership Proof")}
                </h4>
                <ImageUploader
                  key={formData.undocumentedOwnershipProof}
                  fieldName="undocumentedOwnershipProof"
                  onImageChange={handleImagesChange}
                  images={formData.undocumentedOwnershipProof}
                />
              </div>
              <div>
                <h4 className="block text-sm font-medium text-gray-600">
                {t("Judicial Sale Deed")}
                </h4>
                <ImageUploader
                  key={formData.judicialSaleDeed}
                  fieldName="judicialSaleDeed"
                  onImageChange={handleImagesChange}
                  images={formData.judicialSaleDeed}
                />
              </div>
              <div>
                <h4 className="block text-sm font-medium text-gray-600">
                {t("Inheritance Proof")} 
                </h4>
                <ImageUploader
                  key={formData.inheritanceProof}
                  fieldName="inheritanceProof"
                  onImageChange={handleImagesChange}
                  images={formData.inheritanceProof}
                />
              </div>

               <div>
                <h4 className="block text-sm font-medium text-gray-600">
                {t("OwnershipProof")} 
                </h4>
                <ImageUploader
                  key={formData.ownershipProof}
                  fieldName="ownershipProof"
                  onImageChange={handleImagesChange}
                  images={formData.ownershipProof}
                />
              </div>
             
                 <div>
                <h4 className="block text-sm font-medium text-gray-600">
                {t("ResidentialHouseId")}  
                </h4>
                <ImageUploader
                  key={formData.residentialHouseId}
                  fieldName="residentialHouseId"
                  onImageChange={handleImagesChange}
                  images={formData.residentialHouseId}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-6 flex justify-end">
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                 {t("Save Property")}  
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProperty;

import React, { useContext, useEffect, useState } from "react";
import { FaBed, FaBath,FaDoorClosed } from "react-icons/fa";
import ImageUploader from "../../components/ImageUploader";
import { addProperties, getPropertyById } from "../../services/PropertyService";
import { AuthContext } from "../../context/AuthContext";
import { useProperty } from "../../context/PropertyContext";
import { getUsersByUid } from "../../services/UserService";
import UpdateCategory from "./UpdateCategory";
import UpdateAddress from "./UpdateAddress";
import { useLocation } from "react-router-dom";
const UpdateProperty = () => {
  const { uid } = useContext(AuthContext);
  const { addressId, categoryId } = useProperty();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(" ");
  const [propertyData, setPropertyData] = useState({});
  const location = useLocation();
  const { ownerId, _id } = location.state || {};
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
      const property = await getPropertyById(_id);
      setPropertyData(property);
      console.log("property", property);
    };
    getCurrentUserData();
  }, []);
  useEffect(() => {
    if (propertyData) {
      setFormData((prevData) => ({
        ...prevData,
        rentalPrice: propertyData.rentalPrice || "",
        status: propertyData.status || "",
        houseSize: propertyData.houseSize || 0,
        numberOfBedRooms: propertyData.numberOfBedRooms || 0,
        numberOfBathRooms: propertyData.numberOfBathRooms || 0,
        negotiationStatus: propertyData.negotiationStatus || "",
        numberOfRooms: propertyData.numberOfRooms || 0,
        description: propertyData.description || "",
      }));
    }
  
  }, [propertyData]);
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
    console.log("click");
    const data = new FormData();

    // Append images
    formData.houseImage.forEach((image, index) => {
      data.append("houseImage", image);
    });
    formData.ownershipMap.forEach((image, index) => {
      data.append("ownershipMap", image);
    });

    formData.undocumentedOwnershipProof.forEach((map) => {
      data.append("undocumentedOwnershipProof", map);
    });
    formData.residentialHouseId.forEach((map) => {
      data.append("residentialHouseId", map);
    });
    formData.ownershipProof.forEach((map) => {
      data.append("ownershipProof", map);
    });
    formData.judicialSaleDeed.forEach((map) => {
      data.append("judicialSaleDeed", map);
    });
    formData.inheritanceProof.forEach((map) => {
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
      console.log("ownerId", currentUser);
      console.log("addressId", addressId);
      console.log("categoryId", categoryId);
      console.log("click", data);
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
        houseImage: [],
        ownershipMap: [],
        undocumentedOwnershipProof: [],
        residentialHouseId: [],
        ownershipProof: [],
        inheritanceProof: [],
      });
      setStatusMessage("Property added successfully!");
    } catch (error) {
      console.error("Error adding property:", error);
      setStatusMessage("Failed to add property.");
    }
  };

  return (
    <div>
      <div className="bg-[#F0F0F7] pt-10 px-16 ">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Add Our New Property
        </h2>
        <div>
          <UpdateCategory 
            id={propertyData?.categoryId?._id || "N/A"}
            type={propertyData?.categoryId?.type}
            amenities={propertyData?.categoryId?.amenities}
            residentialTypeUnit={propertyData?.categoryId?.residentialTypeUnit}
          />
        </div>
        <div>
          <UpdateAddress
             id={propertyData?.addressId?._id || "N/A"}
            city={propertyData?.addressId?.city || "N/A"}
            subcity={propertyData?.addressId?.subcity || "N/A"}
            district={propertyData?.addressId?.district || "N/A"}
            locality={propertyData?.addressId?.locality || "N/A"}
            streetNumber={propertyData?.addressId?.streetNumber || "N/A"}
            postalCode={propertyData?.addressId?.postalCode || "N/A"}
            streetName={propertyData?.addressId?.streetNumber || "N/A"}
            region={propertyData?.addressId?.region || "N/A"}
            subregion={propertyData?.addressId?.subregion || "N/A"}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-[#42484B] font-bold text-2xl mb-6">
              Description
            </h1>

            <div className="bg-white p-6">
              <span className="mb-4 font-semibold text-[#42484B]">
                ADD YOUR HOME
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Approximate square footage */}
                <div>
                  <label
                    htmlFor="houseSize"
                    className="block text-sm font-medium text-[#42484B]"
                  >
                    Approximate square footage
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
                  <span className="font-semibold text-gray-700">Bedrooms</span>
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
                  <span className="font-semibold text-gray-700">Bathrooms</span>
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
                  <FaDoorClosed className="text-green-600 text-xl" />
                  <span className="font-semibold text-gray-700">
                    NumberOfRooms
                  </span>
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
                Pricing
              </h1>
              <div className="bg-white p-6 text-[#42484B]">
                <span className="font-semibold">
                  LET US KNOW THE FAIR MARKET VALUE TODAY
                </span>
                <label
                  htmlFor="rentalPrice"
                  className="block text-sm font-medium text-gray-600 mt-4"
                >
                  Rental Price
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
                Description
              </h1>
              <div className="bg-white p-6 text-[#42484B]">
                <span className="font-semibold">YOUR HOME</span>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600 mt-4"
                >
                  Description
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
                Photos
              </h1>
              <div className="bg-white p-6">
                <span className="block text-sm font-semibold text-gray-600 py-3">
                  ADD A FEW HOUSES
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
                Status
              </h1>
              <div className="bg-white p-6 text-[#42484B]">
                <div className="mb-6">
                  <label className="block text-sm font-semibold">STATUS</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Under Maintenance">Under Maintenance</option>
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
                    NEGOTIATION STATUS
                  </label>
                  <select
                    name="negotiationStatus"
                    value={formData.negotiationStatus}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="" disabled>
                      Select negotiation status
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

            <h3 className="text-[#42484B] font-semibold text-2xl my-7">
              Ownership Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6">
              <div>
                <h4 className="block text-sm font-medium text-gray-600">
                  Ownership Map
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
                  Undocumented Ownership Proof
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
                  Judicial Sale Deed
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
                  Inheritance Proof
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
                  OwnershipProof
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
                  ResidentialHouseId
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
                Update Property
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateProperty;

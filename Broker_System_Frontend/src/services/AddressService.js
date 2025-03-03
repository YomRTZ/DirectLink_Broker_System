import { addAddress,fetchAllAddress, updateAddress } from "../repository/AddressRepository";

export const getAddress = async () => {
  try {
    return await fetchAllAddress();
  } catch (error) {
    throw error;
  }
};
export const addAddressToDatabase = async (addressData) => {
  try {
    return await addAddress(addressData);
  } catch (error) {
    throw error;
  }
};
export const getAddressById = async (id) => {
  try {
    return await getAddress(id);
  } catch (error) {
    throw error;
  }
};
export const address = async (id,addressData) => {
  try {
    return await updateAddress(id,addressData);
  } catch (error) {
    throw error;
  }
};
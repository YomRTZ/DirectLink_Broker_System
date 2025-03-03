import { fetchAllProperties,addProperty, getProperty, updateProperty } from "../repository/PropertyRepository";

export const getProperties = async () => {
  try {
    return await fetchAllProperties();
  } catch (error) {
    throw error;
  }
};
export const addProperties = async (data) => {
  try {
    return await addProperty(data);
  } catch (error) {
    throw error;
  }
};
export const getPropertyById = async (id) => {
  try {
    return await getProperty(id);
  } catch (error) {
    throw error;
  }
};
export const update = async (id) => {
  try {
    return await updateProperty(id);
  } catch (error) {
    throw error;
  }
};
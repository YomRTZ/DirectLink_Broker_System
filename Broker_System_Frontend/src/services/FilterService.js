import {filterPropertiesByQuery } from "../repository/FilterRepository";
export const getFilteredProperties = async (queryParams) => {
  try {
    return await filterPropertiesByQuery(queryParams);
  } catch (error) {
    throw error;
  }
};


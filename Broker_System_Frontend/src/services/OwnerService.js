import { getOwner } from "../repository/OwnerRepository";

export const getOwnerById = async (id) => {
  try {
    return await getOwner(id);
  } catch (error) {
    console.error(`Error fetching owner with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to fetch owner');
  }
};
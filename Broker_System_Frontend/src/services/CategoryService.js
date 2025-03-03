import { addCategory,fetchAllCategory, updateCategory } from "../repository/CategoryRepository";

export const getCategory = async () => {
  try {
    return await fetchAllCategory();
  } catch (error) {
    throw error;
  }
};
export const addCategoryToDatabase = async (formData) => {
  try {
    return await addCategory(formData);
  } catch (error) {
    throw error;
  }
};
export const CategoryUpdate = async (id,categoryData) => {
  try {
    return await updateCategory(id,categoryData);
  } catch (error) {
    throw error;
  }
};
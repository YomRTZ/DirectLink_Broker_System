import { getRole } from "../repository/RoleRepository";
export const getRoleNameById = async (id) => {
  try {
    return await getRole(id);
  } catch (error) {
    throw error;
  }
};
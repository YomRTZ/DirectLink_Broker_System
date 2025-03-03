import { getUser, getUserByUid, updateUserByid } from "../repository/UserRepository";

export const getUserById = async (id) => {
  try {
    return await getUser(id);
  } catch (error) {
    throw error;
  }
};
export const getUsersByUid = async (uid) => {
  try {
    return await getUserByUid(uid);
  } catch (error) {
    throw error;
  }
};
export const updateUsersByid = async (id,data) => {
  try {
    return await updateUserByid(id,data);
  } catch (error) {
    throw error;
  }
};
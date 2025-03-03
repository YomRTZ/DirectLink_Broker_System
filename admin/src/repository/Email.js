import { sendEmail } from "../service/Email";

export const getEmail = async () => {
  try {
    return await sendEmaill();
  } catch (error) {
    throw error;
  }
};
import { addLeaseAgreement,getLeaseAgreement,updateLeaseAgreement,getAllLeaseAgreement } from "../repository/LeaseAgreement";

export const addLease = async (leaseAgreementData) => {
  try {
    return await addLeaseAgreement(leaseAgreementData);
  } catch (error) {
    throw error;
  }
};
export const updateLease = async (id,leaseAgreementData) => {
  try {
    return await updateLeaseAgreement(id,leaseAgreementData);
  } catch (error) {
    throw error;
  }
};
export const getLease = async (id) => {
  try {
    return await getLeaseAgreement(id);
  } catch (error) {
    throw error;
  }
};
export const getLeases = async () => {
  try {
    return await getAllLeaseAgreement();
  } catch (error) {
    throw error;
  }
};

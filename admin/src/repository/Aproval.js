// add all
export const addLease=async()=>{
    try {
        return await AddLeaseAgrement();
    } catch (error) {
        throw error;
    }
}
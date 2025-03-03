const Owner=require('../models/owner.model');

const getOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findById(id).populate({
      path: 'addressId',
      select: 'city subcity district locality streetNumber postalCode streetName region subregion',
    });
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// //////////
const updateOwnerDetails = async (req, res) => {
    // const { ownerId } = req.owner;
    const { ownerId,inheritanceProof,undocumentedOwnershipProof,ownershipMap,judicialSaleDeed } = req.body; 
    try {
      const owner = await Owner.findById(ownerId);
      if (!owner) {
        return res.status(404).json({ error: "owner not found" });
      }
  console.log(owner,inheritanceProof,undocumentedOwnershipProof,ownershipMap,judicialSaleDeed);
      // Update the personal details
      Object.assign(owner,{ inheritanceProof: req.body.inheritanceProof,
       undocumentedOwnershipProof: req.body.undocumentedOwnershipProof,
        ownershipMap: req.body.ownershipMap,
       judicialSaleDeed: req.body.judicialSaleDeed,
       }); 
      await owner.save();
  
      res.status(200).json({ message: "owner details updated successfully", owner });
    } catch (error) {
      console.error("Error updating owner details:", error);
      res.status(500).json({ error: error.message });
    }
  };
module.exports={
    getOwners,getOwnerById,updateOwnerDetails}
const LeaseAgreement = require("../models/leaseagreement.model");
// Controller to create a new Lease Agreement
const leaseAgreement = async (req, res) => {
  try {
    const { leaseAgreementDocument,tenantId,ownerId,propertyId } = req.body;  
    console.log("leaseAgreementDocument", leaseAgreementDocument);
    const leaseAgreement = new LeaseAgreement({
      leaseAgreementDocument,
      tenantId,
      ownerId,
      propertyId
    });
    const newLeaseAgreement = await leaseAgreement.save();
    res.status(201).json({
      message: 'Lease agreement created and PDF saved successfully!',
      data: newLeaseAgreement,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating lease agreement',
      error: error.message,
    });
  }
};
// get all
const getAllLeases = async (req, res) => {
  try {
    const leases = await LeaseAgreement.find()
      .populate('ownerId')
      .populate('tenantId').populate({
        path: 'propertyId',
        populate: [
      {
        path: 'categoryId',
      },
      {
        path: 'addressId',
      }
    ],
      });

    res.status(200).json(leases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get by id
const getLeaseAgreement = async (req, res) => {
  const { id } = req.params;
  try {
    const leaseAgreement = await LeaseAgreement.findById(id).populate('ownerId')
    .populate('tenantId').populate({
      path: 'propertyId',
      populate: [
    {
      path: 'categoryId',
    },
    {
      path: 'addressId',
    }
  ],
    });;
    if (!leaseAgreement) {
      return res.status(404).json({ message: 'Lease Agreement not found' });
    }
    res.json(leaseAgreement);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error retrieving Lease Agreement' });
  }
};
const updateLeaseAgreements = async (req, res) => {
  try {
    const { id } = req.params; 
    const leaseAgreementData = req.body; 
    const leaseAgreement = await LeaseAgreement.findById(id);
    if (!leaseAgreement) {
      return res.status(404).json({ message: "Lease Agreement not found" });
    }
    console.log("Received leaseAgreementData:", leaseAgreementData);
    leaseAgreement.leaseAgreementDocument = leaseAgreementData.leaseAgreementDocument;
    if (!leaseAgreementData.status) {
      leaseAgreement.status = "New";
    } else {
      leaseAgreement.status = leaseAgreementData.status;
    }
    if (!leaseAgreementData.leaseDate) {
      leaseAgreement.leaseDate = new Date().toISOString().split('T')[0]; 
    } else {
      leaseAgreement.leaseDate = leaseAgreementData.leaseDate;
    }
    const updatedLeaseAgreement = await leaseAgreement.save();
    res.status(200).json({
      message: "Lease Agreement updated successfully",
      data: updatedLeaseAgreement,
    });
  } catch (error) {
    console.error("Error updating Lease Agreement:", error);
    res.status(500).json({
      message: error.message || "Error updating Lease Agreement",
    });
  }
};
const updateLeaseStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;
    const leaseAgreement = await LeaseAgreement.findById(id);
    
    if (!leaseAgreement) {
      return res.status(404).json({ message: "Lease Agreement not found" });
    }
    const validStatuses = ["new", "approve", "rejected"]; 
    if (status && validStatuses.includes(status)) {
      leaseAgreement.status = status; s
    } else {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const updatedLeaseAgreement = await leaseAgreement.save();

    res.status(200).json({
      message: "Lease Agreement status updated successfully",
      data: updatedLeaseAgreement,
    });
  } catch (error) {
    console.error("Error updating Lease Agreement status:", error);
    res.status(500).json({
      message: error.message || "Error updating Lease Agreement status",
    });
  }
};

module.exports = { getAllLeases,leaseAgreement, getLeaseAgreement, updateLeaseAgreements,updateLeaseStatus };

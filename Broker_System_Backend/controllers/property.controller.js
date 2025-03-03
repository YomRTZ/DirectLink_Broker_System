const Property = require('../models/property.model');
exports.createProperty = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const { rentalPrice,numberOfRooms,negotiationStatus,status, houseSize, numberOfBedRooms, numberOfBathRooms,ownerId,addressId,categoryId,description } = req.body;
    const houseImage = req.files.houseImage 
    ? req.files.houseImage.map(file => `/images/${file.filename}`) 
    : [];
    const ownershipMap = req.files.ownershipMap
    ? req.files.ownershipMap.map(file => `/images/${file.filename}`) 
    : [];
    const undocumentedOwnershipProof = req.files.undocumentedOwnershipProof
    ? req.files.undocumentedOwnershipProof.map(file => `/images/${file.filename}`) 
    : [];
    const residentialHouseId = req.files.residentialHouseId
    ? req.files.residentialHouseId.map(file => `/images/${file.filename}`) 
    : [];
    const ownershipProof = req.files.ownershipProof
    ? req.files.ownershipProof.map(file => `/images/${file.filename}`) 
    : [];
    const judicialSaleDeed = req.files.judicialSaleDeed
    ? req.files.judicialSaleDeed.map(file => `/images/${file.filename}`) 
    : [];
    const inheritanceProof = req.files.inheritanceProof
    ? req.files.inheritanceProof.map(file => `/images/${file.filename}`) 
    : [];
    // Create a new property document
    const property = new Property({
      rentalPrice,
      status,
      houseSize,
      numberOfBedRooms,
      numberOfBathRooms,
      houseImage,
      ownershipMap,
      ownerId,
      addressId,
      categoryId,
      description,
      numberOfRooms,
      negotiationStatus,
      undocumentedOwnershipProof,
      residentialHouseId,
      ownershipProof,
      judicialSaleDeed,
      inheritanceProof
    });

    // Save to MongoDB
    const savedProperty = await property.save();

    res.status(200).json({
      message: "Property created successfully!",
      data: savedProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Error creating property", error });
  }
};


exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate({
      path: 'addressId',
      select: 'city subcity district locality streetNumber postalCode streetName region subregion',
    }).populate({
      path: 'categoryId',
      select: 'type residentialTypeUnit amenities',
    }).populate('ownerId');

    const updatedProperties = properties.map((property) => {
      // Construct the full image URL using the protocol and host
      const fullHousImageUrl = `${req.protocol}://${req.get('host')}${property.houseImage}`;
      const fullOwnershipMapImageUrl = `${req.protocol}://${req.get('host')}${property.ownershipMap}`;
      const fullUndocumentedOwnershipProofImageUrl = `${req.protocol}://${req.get('host')}${property.undocumentedOwnershipProof}`;
      const fullJudicialSaleDeedImageUrl = `${req.protocol}://${req.get('host')}${property.judicialSaleDeed}`;
      const fullInheritanceProofImageUrl = `${req.protocol}://${req.get('host')}${property.inheritanceProof}`;
      const fullResidentialHouseIdImageUrl = `${req.protocol}://${req.get('host')}${property.residentialHouseId}`;
      const fullownershipProofImageUrl = `${req.protocol}://${req.get('host')}${property.ownershipProof}`;
      // Log the full image URL for debugging
      console.log("Full image URL:", fullHousImageUrl);

      return {
        ...property._doc,
        houseImage: fullHousImageUrl, 
        ownershipMap:fullOwnershipMapImageUrl,
        undocumentedOwnershipProof:fullUndocumentedOwnershipProofImageUrl,
        judicialSaleDeed:fullJudicialSaleDeedImageUrl,
        inheritanceProof:fullInheritanceProofImageUrl,
       residentialHouseId:fullResidentialHouseIdImageUrl,
       ownershipProof:fullownershipProofImageUrl 
      };
    });

    console.log("Updated properties:", updatedProperties);
    res.json(updatedProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id).populate({
      path: 'addressId',
      select: 'city subcity district locality streetNumber postalCode streetName region subregion',
    }).populate({
      path: 'categoryId',
      select: 'type residentialTypeUnit amenities',
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    const fullHousImageUrl = property.houseImage ? `${req.protocol}://${req.get('host')}${property.houseImage}` : null;
    const fullOwnershipMapImageUrl = property.ownershipMap ? `${req.protocol}://${req.get('host')}${property.ownershipMap}` : null;
    const fullUndocumentedOwnershipProofImageUrl = property.undocumentedOwnershipProof ? `${req.protocol}://${req.get('host')}${property.undocumentedOwnershipProof}` : null;
    const fullJudicialSaleDeedImageUrl = property.judicialSaleDeed ? `${req.protocol}://${req.get('host')}${property.judicialSaleDeed}` : null;
    const fullInheritanceProofImageUrl = property.inheritanceProof ? `${req.protocol}://${req.get('host')}${property.inheritanceProof}` : null;
    const fullResidentialHouseIdImageUrl = property.residentialHouseId ? `${req.protocol}://${req.get('host')}${property.residentialHouseId}` : null;
    const fullownershipProofImageUrl = property.ownershipProof ? `${req.protocol}://${req.get('host')}${property.ownershipProof}` : null;

    console.log("Full image URL:", fullHousImageUrl);

    // Return the updated property with full URLs
    const updatedProperty = {
      ...property._doc,
      houseImage: fullHousImageUrl,
      ownershipMap: fullOwnershipMapImageUrl,
      undocumentedOwnershipProof: fullUndocumentedOwnershipProofImageUrl,
      judicialSaleDeed: fullJudicialSaleDeedImageUrl,
      inheritanceProof: fullInheritanceProofImageUrl,
      residentialHouseId: fullResidentialHouseIdImageUrl,
      ownershipProof: fullownershipProofImageUrl,
    };

    console.log("Updated property:", updatedProperty);
    res.json(updatedProperty);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//update property 

exports.updateProperty = async (req, res) => {
  console.log("called");
  const { rentalPrice, numberOfRooms, negotiationStatus, status, houseSize, numberOfBedRooms, numberOfBathRooms, ownerId, addressId, categoryId, description } = req.body;
  const { propertyId } = req.params;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Handle image files and property document uploads
    let houseImage = property.houseImage;
    if (req.files?.houseImage?.[0]) {
      houseImage = req.files.houseImage.map(file => `/images/${file.filename}`);
    }

    let ownershipMap = property.ownershipMap;
    if (req.files?.ownershipMap?.[0]) {
      ownershipMap = req.files.ownershipMap.map(file => `/images/${file.filename}`);
    }

    let undocumentedOwnershipProof = property.undocumentedOwnershipProof;
    if (req.files?.undocumentedOwnershipProof?.[0]) {
      undocumentedOwnershipProof = req.files.undocumentedOwnershipProof.map(file => `/images/${file.filename}`);
    }

    let residentialHouseId = property.residentialHouseId;
    if (req.files?.residentialHouseId?.[0]) {
      residentialHouseId = req.files.residentialHouseId.map(file => `/images/${file.filename}`);
    }

    let ownershipProof = property.ownershipProof;
    if (req.files?.ownershipProof?.[0]) {
      ownershipProof = req.files.ownershipProof.map(file => `/images/${file.filename}`);
    }

    let judicialSaleDeed = property.judicialSaleDeed;
    if (req.files?.judicialSaleDeed?.[0]) {
      judicialSaleDeed = req.files.judicialSaleDeed.map(file => `/images/${file.filename}`);
    }

    let inheritanceProof = property.inheritanceProof;
    if (req.files?.inheritanceProof?.[0]) {
      inheritanceProof = req.files.inheritanceProof.map(file => `/images/${file.filename}`);
    }

    // Update property data
    Object.assign(property, {
      rentalPrice,
      numberOfRooms,
      negotiationStatus,
      status,
      houseSize,
      numberOfBedRooms,
      numberOfBathRooms,
      ownerId,
      addressId,
      categoryId,
      description,
      houseImage,
      ownershipMap,
      undocumentedOwnershipProof,
      residentialHouseId,
      ownershipProof,
      judicialSaleDeed,
      inheritanceProof
    });

    await property.save();

    // Prepare response with full URLs for all files
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const responseProperty = {
      ...property._doc,
      houseImage: houseImage ? houseImage.map(img => `${baseUrl}${img}`) : [],
      ownershipMap: ownershipMap ? ownershipMap.map(img => `${baseUrl}${img}`) : [],
      undocumentedOwnershipProof: undocumentedOwnershipProof ? undocumentedOwnershipProof.map(img => `${baseUrl}${img}`) : [],
      residentialHouseId: residentialHouseId ? residentialHouseId.map(img => `${baseUrl}${img}`) : [],
      ownershipProof: ownershipProof ? ownershipProof.map(img => `${baseUrl}${img}`) : [],
      judicialSaleDeed: judicialSaleDeed ? judicialSaleDeed.map(img => `${baseUrl}${img}`) : [],
      inheritanceProof: inheritanceProof ? inheritanceProof.map(img => `${baseUrl}${img}`) : [],
    };

    res.status(200).json({ 
      message: "Property details updated successfully", 
      property: responseProperty 
    });

  } catch (error) {
    console.error("Error updating property details:", error);
    res.status(500).json({ error: error.message });
  }
};



// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findOneAndDelete({ propertyId: req.params.id });
    if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

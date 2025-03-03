const Address = require('../models/address.model');

exports.createAddress = async (req, res) => {
  try {
      const {
        city,
        subcity,
        district,
        locality,
        streetNumber,
        postalCode,
        streetName,
        region,
        subregion,
      } = req.body;  
      const address = new Address({
        city,
        subcity,
        district,
        locality,
        streetNumber,
        postalCode,
        streetName,
        region,
        subregion,
      });
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      city,
      subcity,
      district,
      locality,
      streetNumber,
      postalCode,
      streetName,
      region,
      subregion,
    } = req.body;

    const address = await Address.findByIdAndUpdate(
      id,
      {
        city,
        subcity,
        district,
        locality,
        streetNumber,
        postalCode,
        streetName,
        region,
        subregion,
      },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an Address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

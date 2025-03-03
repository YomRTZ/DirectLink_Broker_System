const User = require("../models/user.model");
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roleId", "name").populate({
      path: "addressId",
      select: "city subcity district",
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  console.log("call");
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: "addressId",
      select:
        "city subcity district locality streetNumber postalCode streetName region subregion",
    });
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const profilePicture = `${req.protocol}://${req.get("host")}${user.profilePicture}`;
    const residenceId = `${req.protocol}://${req.get("host")}${user.residenceId}`;
    const officeId = `${req.protocol}://${req.get("host")}${user.officeId}`;
    const documents = `${req.protocol}://${req.get("host")}${user.documents}`;
    const driverLicense = `${req.protocol}://${req.get("host")}${user.driverLicense}`;
    const passport = `${req.protocol}://${req.get("host")}${user.passport}`;
    const studentRenewalId = `${req.protocol}://${req.get("host")}${user.studentRenewalId}`;
    console.log("Full image URL:", profilePicture);
    const updatedUser = {
      ...user._doc,
      profilePicture: profilePicture,
      residenceId: residenceId,
      officeId: officeId,
      documents: documents,
      driverLicense: driverLicense,
      passport: passport,
      studentRenewalId: studentRenewalId,
    };
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get user By uid
const getUserByUid = async (req, res) => {
  const { uid } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "User ID (uid) is required" });
  }

  try {
    const user = await User.findOne({ uid }).populate({
      path: "addressId",
      select:
        "city subcity district locality streetNumber postalCode streetName region subregion",
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const profilePicture = `${req.protocol}://${req.get("host")}${user.profilePicture}`;
    const residenceId = `${req.protocol}://${req.get("host")}${user.residenceId}`;
    const officeId = `${req.protocol}://${req.get("host")}${user.officeId}`;
    const documents = `${req.protocol}://${req.get("host")}${user.documents}`;
    const driverLicense = `${req.protocol}://${req.get("host")}${user.driverLicense}`;
    const passport = `${req.protocol}://${req.get("host")}${user.passport}`;
    const studentRenewalId = `${req.protocol}://${req.get("host")}${user.studentRenewalId}`;
    
    console.log("Full image URL:", profilePicture);

    const updatedUser = {
      ...user._doc,
      profilePicture: profilePicture,
      residenceId: residenceId,
      officeId: officeId,
      documents: documents,
      driverLicense: driverLicense,
      passport: passport,
      studentRenewalId: studentRenewalId,
    };

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUserDetails = async (req, res) => {
  console.log("called");
  const { userId, firstName, middleName, lastName, addressId } = req.body;
  console.log("data", req.body);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Handle profile picture
    let profilePicture = user.profilePicture;
    if (req.files?.profilePicture?.[0]) {
      const file = req.files.profilePicture[0];
      profilePicture = `/images/${file.filename}`;
    }

    // Handle other documents
    let residenceId = user.residenceId;
    if (req.files?.residenceId?.[0]) {
      const file = req.files.residenceId[0];
      residenceId = `/images/${file.filename}`;
    }

    let officeId = user.officeId;
    if (req.files?.officeId?.[0]) {
      const file = req.files.officeId[0];
      officeId = `/images/${file.filename}`;
    }

    let documents = user.documents;
    if (req.files?.documents?.[0]) {
      const file = req.files.documents[0];
      documents = `/images/${file.filename}`;
    }

    let driverLicense = user.driverLicense;
    if (req.files?.driverLicense?.[0]) {
      const file = req.files.driverLicense[0];
      driverLicense = `/images/${file.filename}`;
    }

    let passport = user.passport;
    if (req.files?.passport?.[0]) {
      const file = req.files.passport[0];
      passport = `/images/${file.filename}`;
    }

    let studentRenewalId = user.studentRenewalId;
    if (req.files?.studentRenewalId?.[0]) {
      const file = req.files.studentRenewalId[0];
      studentRenewalId = `/images/${file.filename}`;
    }

    // Update user data
    Object.assign(user, {
      firstName,
      middleName,
      lastName,
      addressId,
      profilePicture,
      residenceId,
      documents,
      officeId,
      driverLicense,
      passport,
      studentRenewalId,
    });

    await user.save();

    // Prepare response with full URLs for all files
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const responseUser = {
      ...user._doc,
      profilePicture: profilePicture ? `${baseUrl}${profilePicture}` : null,
      residenceId: residenceId ? `${baseUrl}${residenceId}` : null,
      officeId: officeId ? `${baseUrl}${officeId}` : null,
      documents: documents ? `${baseUrl}${documents}` : null,
      driverLicense: driverLicense ? `${baseUrl}${driverLicense}` : null,
      passport: passport ? `${baseUrl}${passport}` : null,
      studentRenewalId: studentRenewalId ? `${baseUrl}${studentRenewalId}` : null,
    };

    res.status(200).json({ 
      message: "User details updated successfully", 
      user: responseUser 
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: error.message });
  }
};
// 
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await User.findByIdAndDelete(id, req.body);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getUsers,
  getUserById,
  getUserByUid,
  updateUserDetails,
  deleteUser,
  updateUser,
};

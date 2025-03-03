const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
uid: { type: String, required: true, unique: true },
firstName: { type: String  },
middleName: { type: String },
lastName: { type: String},
addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
email: { type: String },
profilePicture: { type: [String] },
residenceId: { type: [String] },
documents: { type: [String] },
officeId: { type: [String] },
driverLicense: { type: [String] },
passport: { type:[ String ]},
studentRenewalId: { type: [String ]},
roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});
module.exports = mongoose.model("User", UserSchema);
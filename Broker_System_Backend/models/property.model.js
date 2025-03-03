const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String},
  rentalPrice: { type: Number },
  numberOfBedRooms:{type:Number},
  numberOfBathRooms:{type:Number},
  houseSize: {type: Number },
  numberOfRooms: { type: Number },
  status: { type: String,},
  negotiationStatus:{type:String},
  houseImage: {type: [String]},
  residentialHouseId:{type: [String]},
  ownershipProof: { type: [String] },
  undocumentedOwnershipProof: { type: [String] },
  ownershipMap: { type: [String] },
  judicialSaleDeed: { type: [String] },
  inheritanceProof:{type:[String]}
});

module.exports = mongoose.model('Property', propertySchema);

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
});

module.exports = mongoose.model('Review', reviewSchema);


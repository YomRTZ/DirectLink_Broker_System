const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  type: { type: String },
  residentialTypeUnit: { type: String},
  amenities: { type: [String] },
});

module.exports = mongoose.model('Category', categorySchema);

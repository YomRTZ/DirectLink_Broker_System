const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: { type: String  },
  subcity: { type: String  },
  district: { type: String  },
  locality: { type: String  },
  streetNumber: { type: Number },
  postalCode: { type: Number},
  streetName: { type: String},
  region: { type: String },
  subregion: { type: String },
});

module.exports = mongoose.model('Address', addressSchema);

const mongoose = require('mongoose');

const leaseAgreementSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property'},
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // startDate: { type: Date },
  // endDate: { type: Date},
  leaseDate: { type: Date},
  leaseAgreementDocument:{type:String},
  status:{type:String}
});

module.exports = mongoose.model('LeaseAgreement', leaseAgreementSchema);

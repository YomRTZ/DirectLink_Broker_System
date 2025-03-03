const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
leaseAgreementId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaseAgreement' },
});

module.exports = mongoose.model('Tenant', tenantSchema);
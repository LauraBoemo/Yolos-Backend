const mongoose = require('mongoose');

const UserPartySchema = new mongoose.Schema({
  partyId: String,
  userId: String,
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('UserParty', UserPartySchema);

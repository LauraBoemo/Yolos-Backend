const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  partyId: String,
  userId: String,
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('Cart', CartSchema);

const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  startAt: Date,
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('Party', PartySchema);

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
}, {
  timestamps: true,
  versionKey: false,
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserModel = require('../models/user');

class User {
  async index(req, res) {
    const users = await UserModel.find({});
    return res.json(users);
  }

  async show(req, res) {
    const { id: userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'O ID fornecido não é válido.' });
    }

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'O usuário não foi encontrado.' });
    return res.json(user);
  }

  async create(req, res) {
    const user = new UserModel(req.body);
    const data = await user.save();
    return res.json(data);
  }

  async authenticate(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User with the provided email does not exist.' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ status: 'error', message: 'Email or password is invalid.' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECERT_KEY, { expiresIn: '1d' });
    return res.json({
      user: {
        _id: user.id,
        email: user.email,
      },
      token,
    });
  }

  async update(req, res) {
    const { id: userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Provided id is not valid.' });
    }

    await UserModel.findOneAndUpdate({ _id: userId }, {
      $set: req.body,
    });
    return res.json({ updated: true });
  }

  async destroy(req, res) {
    const { id: userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Provided id is not valid.' });
    }

    await UserModel.findOneAndRemove({ _id: userId });
    return res.json({ deleted: true });
  }
}

module.exports = new User();

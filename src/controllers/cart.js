const CartModel = require('../models/cart');

class Cart {
  async index(req, res) {
    const { auth } = req;

    const cart = await CartModel.find({
      userId: auth._id,
    });

    res.json(cart);
  }

  async create(req, res) {
    const { auth } = req;

    const cart = new CartModel({
      userId: auth._id,
      partyId: req.body.partyId,
    });
    const data = await cart.save();

    return res.json(data);
  }

  async destroy(req, res) {
    const { id: cartId } = req.params;

    await CartModel.findOneAndRemove({ _id: cartId });

    return res.json({ deleted: true });
  }
}

module.exports = new Cart();

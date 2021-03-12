const UserPartyModel = require('../models/user-party');

class UserParty {
  async index(req, res) {
    const { auth } = req;

    const userParty = await UserPartyModel.find({
      userId: auth._id,
    });

    res.json(userParty);
  }

  async create(req, res) {
    const { auth } = req;

    const userParty = new UserPartyModel({
      userId: auth._id,
      partyId: req.body.partyId,
    });
    const data = await userParty.save();

    return res.json(data);
  }

  async destroy(req, res) {
    const { id: userPartyId } = req.params;

    await UserPartyModel.findOneAndRemove({ _id: userPartyId });

    return res.json({ deleted: true });
  }
}

module.exports = new UserParty();

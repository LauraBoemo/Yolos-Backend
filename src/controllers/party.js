const mongoose = require('mongoose');
const PartyModel = require('../models/party');

class Party {
  async index(req, res) {
    const parties = await PartyModel.find({});
    return res.json(parties);
  }

  async show(req, res) {
    const { id: partyId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(partyId)) {
      return res.status(400).json({ message: 'O ID fornecido não é válido.' });
    }

    const party = await PartyModel.findById(partyId);
    if (!party) return res.status(404).json({ message: 'Festa não encontrada.' });
    return res.json(party);
  }
}

module.exports = new Party();

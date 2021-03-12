require('dotenv/config');
require('../src/core/mongo');

const user = require('./user.json');
const party = require('./party.json');
const UserModel = require('../src/models/user');
const PartyModel = require('../src/models/party');

(async () => {
  console.log('Criando festas...');
  await PartyModel.create(party);
  console.log('✓ As festas foram criadas! ');


  console.log('Criando usuários...');
  await UserModel.create(user);
  console.log('✓ Os usuários foram criados!');


  process.exit();
})();

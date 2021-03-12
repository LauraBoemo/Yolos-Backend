const { Router } = require('express');

const verifyJwtToken = require('./middleware/guard');
const CartController = require('./controllers/cart');
const UserController = require('./controllers/user');
const PartyController = require('./controllers/party');
const UserPartyController = require('./controllers/user-party');

const router = Router();

// Status das rodas
router.get('/', (req, res) => res.json({ status: true }));

// Rotas fantasmas
router.post('/signup', UserController.create);
router.post('/login', UserController.authenticate);

// Rota dos usuários
router.get('/users/:id', verifyJwtToken, UserController.show);
router.put('/users/:id', verifyJwtToken, UserController.update);

// Rota das festas
router.get('/party', verifyJwtToken, PartyController.index);
router.get('/party/:id', verifyJwtToken, PartyController.show);

// Rota das festas do usuário
router.get('/user-party', verifyJwtToken, UserPartyController.index);
router.post('/user-party', verifyJwtToken, UserPartyController.create);
router.delete('/user-party/:id', verifyJwtToken, UserPartyController.destroy);

// Rota do carrinho
router.get('/cart', verifyJwtToken, CartController.index);
router.post('/cart', verifyJwtToken, CartController.create);
router.delete('/cart/:id', verifyJwtToken, CartController.destroy);

module.exports = router;

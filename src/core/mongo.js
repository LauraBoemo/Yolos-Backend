const mongoose = require('mongoose');

const { MONGO_DSN } = process.env;
const MONGOOSE_OPT = JSON.parse(process.env.MONGOOSE_OPT);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_DSN, MONGOOSE_OPT, (err) => {
  if (err) console.log(JSON.stringify(err));
});

// Quando conectar com sucesso.
mongoose.connection.on('connected', () => console.log(`Conentado @ ${ MONGO_DSN }`));

// Quando a conexão gerar um erro.
mongoose.connection.on('error', (err) => console.log(`Erro de conexão com o Mongoose: ${ JSON.stringify(err) }`));

// Quando a conexão é desconectada.
mongoose.connection.on('disconnected', () => console.log('Conexão padrão do Mongoose perdida.'));

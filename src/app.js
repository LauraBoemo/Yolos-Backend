require('dotenv').config();
const http = require('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

require('./core/mongo');
const router = require('./routes');
const { handleUncaughtErrors } = require('./core/fatal');

handleUncaughtErrors();

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api', router);

// Route not found middleware
app.use((req, res, next) => res.status(404).json({ message: `Route ${ req.url } not found.` }));
// Exception handler middleware
app.use((err, req, res, next) => {
  console.log(`Runtime exception: ${ err.message } ${ JSON.stringify(err.stack) }`);
  return res.status(500).json({ error: err });
});

app.server = http.createServer(app);
app.server.listen(APP_PORT, () => {
  console.log(`Server started on ${ APP_PORT }`);
});

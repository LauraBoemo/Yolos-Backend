/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

/**
 * Verificação de Token.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @return {*|never|Promise<any>}
 */

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) return res.status(400).json({ message: 'No token provided.' });

  if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

  // Verifica secret e confere se o token está expirado.
  jwt.verify(token, process.env.JWT_SECERT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    req.auth = decoded;
    next();
  });
};

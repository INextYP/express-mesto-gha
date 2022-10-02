const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Пользователь не авторизован');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthError('Пользователь не авторизован');
  }

  req.user = payload;
  return next();
};

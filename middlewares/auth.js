const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  try {
    payload = jwt.verify(token, 'jwt-secret-token');
  } catch (err) {
    next(new AuthError('Пожалуйста авторизуйтесь'));
  }
  req.user = payload;
  return next();
};

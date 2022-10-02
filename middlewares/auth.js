const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'jwt-token');
  } catch (err) {
    next(new AuthError('Пожалуйста авторизуйтесь'));
  }
  req.user = payload;
  return next();
};

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isURL, isEmail } = require('validator');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String, minlength: 2, maxlength: 30, default: 'Жак-Ив Кусто',
  },
  about: {
    type: String, minlength: 2, maxlength: 30, default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Указан некорректный Email или пароль.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Указан некорректный Email или пароль.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

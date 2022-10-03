const { celebrate, Joi } = require('celebrate');

const isUrlValidate = (url, message) => {
  const patternUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!patternUrl.test(url)) {
    return message.error('Ссылка не валидна');
  }
  return url;
};

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isUrlValidate),
  }),
});

const setAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrlValidate),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(isUrlValidate),
  }),
});

const cardSearchValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  registrationValidation,
  loginValidation,
  setAvatarValidation,
  createCardValidation,
  userUpdateValidation,
  cardSearchValidation,
};

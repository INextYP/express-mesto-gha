const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const NotRootError = require('../errors/NotRootError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('неверные данные'));
      } else {
        next(error);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      const user = String(req.user._id);
      const cardOwner = String(card.owner);
      if (user === cardOwner) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => res.send(deletedCard))
          .catch(next);
      } else {
        next(new NotRootError('Вы можете удалять только собственные карточки'));
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Не верные данные'));
      } else {
        next(error);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Неверные данные'));
        return;
      }
      next(error);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Неверные данные'));
        return;
      }
      next(error);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

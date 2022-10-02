const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardValidation, cardSearchValidation } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);

router.delete('/:cardId', cardSearchValidation, deleteCard);

router.put('/:cardId/likes', cardSearchValidation, likeCard);

router.delete('/:cardId/likes', cardSearchValidation, dislikeCard);

module.exports = router;

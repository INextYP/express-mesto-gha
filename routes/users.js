const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userUpdateValidation, setAvatarValidation } = require('../middlewares/validation');
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me', userUpdateValidation, updateUser);

router.patch('/me/avatar', setAvatarValidation, updateAvatar);

module.exports = router;

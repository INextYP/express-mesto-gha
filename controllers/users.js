const User = require('../models/user');

const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((error) => res.status(ERROR_500).send({ message: error.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_400).send({ message: 'Переданы неверные данные' });
        return;
      }
      res.status(ERROR_500).send({ message: error.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: 'Переданы неверные данные' });
        return;
      }
      res.status(ERROR_500).send({ message: error.message });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: 'Переданы неверные данные' });
        return;
      }
      if (error.name === 'CastError') {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(ERROR_500).send({ message: error.message });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: 'Переданы неверные данные' });
        return;
      }
      res.status(ERROR_500).send({ message: error.message });
    });
};

module.exports = {
  createUser, getUsers, getUserById, updateUser, updateAvatar,
};

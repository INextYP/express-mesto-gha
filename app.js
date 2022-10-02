const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  registrationValidation,
  loginValidation,
} = require('./middlewares/validation');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signup', registrationValidation, createUser);

app.post('/signin', loginValidation, login);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.use(errors());

app.use((err, req, res, next) => {
  console.log(err.stack || err);
  const status = err.statusCode || 500;

  res.status(status).send({ err });
  next();
});

app.listen(PORT);

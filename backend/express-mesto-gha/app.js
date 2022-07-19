require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { isAuth } = require('./middlewares/auth');
const { validateLink } = require('./helpers/validateLink');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(requestLogger);

const allowedCors = [
  'https://borisbell.nomoredomains.xyz',
  'http://borisbell.nomoredomains.xyz',
  'localhost:3000',
  'localhost:3001',
];
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateLink),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);

app.use('/users', isAuth, usersRouter);
app.use('/cards', isAuth, cardsRouter);

app.use('*', isAuth, (req, res) => { // eslint-disable-line no-unused-vars
  throw new NotFoundError('Страницы не существует');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: 'Что-то пошло не так' });
});

app.listen(PORT, () => {});

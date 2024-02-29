const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

mongoose
  .connect(
    'mongodb+srv://EnzoPetit:admin@grimoire.w21sdzb.mongodb.net/?retryWrites=true&w=majority&appName=Grimoire',
    // eslint-disable-next-line comma-dangle
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('connexion à MongoDB réussie !'))
  .catch(() => console.log('connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;

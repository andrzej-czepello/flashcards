const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const flashcardRoutes = require('./routes/flashcards');
const dictionaryRoutes = require('./routes/dictionaries');
const translationsRoutes = require('./routes/translations');

require("dotenv").config();

const app = express();
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zuqln.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`)
  .then(result => {
    app.listen(process.env.SERVER_PORT);
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', flashcardRoutes);
app.use('/api', dictionaryRoutes);
app.use('/api', translationsRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

module.exports = app;

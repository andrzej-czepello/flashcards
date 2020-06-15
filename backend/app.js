const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const flashcardRoutes = require('./routes/flashcards');

const app = express();

mongoose.connect("mongodb+srv://andrzej:i7uRS8uY0vE9cmXD@cluster0-zuqln.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', flashcardRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

module.exports = app;

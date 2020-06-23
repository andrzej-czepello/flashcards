const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const flashcardRoutes = require('./routes/flashcards');
const Flashcard = require('./models/flashcard');

const app = express();

mongoose.connect("mongodb+srv://andrzej:i7uRS8uY0vE9cmXD@cluster0-zuqln.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));

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

app.get("/api/flashcards/:id", (req, res, next) => {
  Flashcard.findById(req.params.id).then(flashcard => {
    if (flashcard) {
      res.status(200).json(flashcard);
    } else {
      res.status(404).json({message: "Flashcard not found!"});
    }
  })
})

app.put("/api/flashcards/:id", (req, res, next) => {
  const flashcard = new Flashcard({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    userInput: ''
  });
  Flashcard.updateOne({_id: req.params.id}, flashcard).then(result => {
    res.status(200).json({message: "Update successful"});
  });
});

module.exports = app;

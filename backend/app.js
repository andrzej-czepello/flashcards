const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Flashcard = require('./models/flashcard');

const app = express();

mongoose.connect("mongodb+srv://andrzej:i7uRS8uY0vE9cmXD@cluster0-zuqln.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log("LOG [DB] connected");
})
.catch(() => {
  console.log("LOG [DB] Connection error");
})

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  next();
});

app.post("/api/flashcards", (req, res, next) => {
  const flashcard = new Flashcard({
    title: req.body.title,
    content: req.body.content,
  });
  flashcard.save().then(createdFlashcard => {
    res.status(201).json({
      message: "flashcard added sucessfully",
      flashcardId: createdFlashcard._id
  })

  });
});

app.get("/api/flashcards", (req, res, next) => {
  Flashcard.find().then(documents => {
    res.status(200).json({
      message: "Flashcard fetched succesfully!",
      flashcards: documents
    });
  });
});

app.delete("/api/flashcards/:id", (req, res, next) => {
  Flashcard.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({ message: "Flashcard deleted" });
});

module.exports = app;

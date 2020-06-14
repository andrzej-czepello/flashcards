const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post("/api/flashcards", (req, res, next) => {
  const flashcards = req.body;

  res.status(201).json({
    message: "flashcard added sucessfully"
  })
});

app.get('/api/flashcards', (req, res, next) => {
  const flashcards = [
    { id: "1", title: "flashcard title_1", content: "content_1"},
    { id: "2", title: "flashcard title_2", content: "content_2"}
  ]
  res.status(200).json({
    message: 'Flashcard fetched succesfully!',
    flashcards: flashcards
  });
});

module.exports = app;

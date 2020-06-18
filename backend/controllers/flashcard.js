const Flashcard = require('../models/flashcard');
const https = require("https");
const request = require('request');

exports.createFlashcard = (req, res, next) => {
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
};

exports.getFlashcards = (req, res, next) => {
  Flashcard.find().then(documents => {
    res.status(200).json({
      message: "Flashcard fetched succesfully!",
      flashcards: documents
    });
  });
};

exports.deleteFlashcard = (req, res, next) => {
  Flashcard.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({ message: "Flashcard deleted" });
};

exports.getDictionaries = (req, res, next) => {
  const options = {
    url: 'https://api.pons.com/v1/dictionaries?language=pl',
    method: 'GET'
  }
  request(options, (error, response, body) => {
        res.status(200).json({
          message: "Translation received",
          dictionaries: JSON.parse(body)
        });
      }
  );
}

exports.getTranslation = (req, res, next) => {
    const options = {
    url: 'https://api.pons.com/v1/dictionary?q=samochod&l=depl',
    method: 'GET',
    headers: { 'X-Secret': '37cfa9fa7739677593c5a335dd174ad25838fdd558f34c4627376e0956b1f3d0'}
  }
  request(options, (error, response, body) => {
        res.status(200).json({
          message: "Translation received",
          translations: JSON.parse(body)
        });
      }
  );
}
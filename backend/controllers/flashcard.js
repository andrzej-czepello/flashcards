const { validationResult } = require('express-validator');
const request = require('request');
const Flashcard = require('../models/flashcard');

exports.createFlashcard = (req, res, next) => {
  const flashcard = new Flashcard({
    title: req.body.title,
    content: req.body.content,
    userInput: req.body.userInput
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
  })
  res.status(200).json({ message: "Flashcard deleted" });
};

exports.getDictionaries = (req, res, next) => {

  const options = {
    url: 'https://api.pons.com/v1/dictionaries',
    method: 'GET',
    qs: {'language': 'en'}
  }
  request(options, (error, response, body) => {
        res.status(200).json({
          message: "Translation received",
          dictionaries: JSON.parse(body)
        });
      }
  );
}

exports.postTranslation = (req, res, next) => {
    const options = {
    url: 'https://api.pons.com/v1/dictionary',
    method: 'GET',
    headers: { 'X-Secret': '37cfa9fa7739677593c5a335dd174ad25838fdd558f34c4627376e0956b1f3d0'},
    qs: {'l': req.body.languages, 'q': req.body.word}
  }

  request(options, (error, response, body) => {
    if(body){
      res.status(200).json({
        message: "Translations received",
        translations: JSON.parse(body)
    });
    }else{
      res.status(204).json({
        message: "No translations available",
        translations: []
    });
    }}
  );
}

exports.getFlashcard = (req, res, next) => {
  Flashcard.findById(req.params.id).then(flashcard => {
    if (flashcard) {
      res.status(200).json(flashcard);
    } else {
      res.status(404).json({message: "Flashcard not found!"});
    };
  });
};

exports.editFlashcard = (req, res, next) => {
  const flashcard = new Flashcard({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    userInput: ''
  });
  Flashcard.updateOne({_id: req.params.id}, flashcard).then(result => {
    res.status(200).json({message: "Update successful"});
  });
};


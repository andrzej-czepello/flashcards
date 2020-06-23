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

  // console.log("[controller] req.body.word:" + req.body.word);
  // console.log("[controller] req.body.lang:" + req.body.languages);

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

// exports.editFlashcard = (req, res, next) => {
//   const flashcardId = req.params.id;
//   const title = req.body.title;
//   const content = req.body.content;
//   const userInput = req.body.userInput;

//   // const errors = validationResult(req);
//   // if (!errors.isEmpty()){
//   //   const error = new Error('Validation failed, entered data is incorrect.');
//   //   error.statusCode = 422;
//   //   throw error;
//   // }

//   Flashcard.findById(flashcardId)
//   .then(flashcard => {
//     if(!flashcard) {
//       const error = new Error('Could not find a flashcard.');
//       error.statusCode = 404;
//       throw error;
//     }
//     flashcard.title = title;
//     flashcard.content = content;
//     return flashcard.save();
//   })
//   .then(result => {
//     res.status(200).json({message: 'Flashcard updated successfully', flashcard: result});
//   })
//   .catch(err => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   });

// };



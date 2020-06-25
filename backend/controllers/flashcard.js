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

exports.deleteFlashcard = (req, res, next) => {
  Flashcard.deleteOne({_id: req.params.id}).then(result => {
  })
  res.status(200).json({ message: "Flashcard deleted" });
};


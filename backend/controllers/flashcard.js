const Flashcard = require('../models/flashcard');

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

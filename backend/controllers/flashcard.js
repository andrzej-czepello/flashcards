const Flashcard = require('../models/flashcard');
const https = require("https");

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
  console.log('[controller] getDictionaries');
  https.get('https://api.pons.com/v1/dictionaries?language=pl', (resp) => {

    let data = '';
    let result = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      //console.log(JSON.parse(data)[1].key);
      result = JSON.parse(data);
      res.status(200).json({
        message: "Dicts from PONS downloaded",
        dictionaries: result});
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

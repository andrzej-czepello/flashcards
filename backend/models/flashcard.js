const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userInput: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Flashcard', flashcardSchema);

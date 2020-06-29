const express = require('express');

const flashcardsController = require('../controllers/flashcard');

const router = express.Router();

router.get('/flashcards', flashcardsController.getFlashcards);

router.get("/flashcards/:id", flashcardsController.getFlashcard);

router.post('/flashcards', flashcardsController.createFlashcard);

 router.delete('/flashcards/:id', flashcardsController.deleteFlashcard);

router.put("/flashcards/:id", flashcardsController.editFlashcard);

module.exports = router;

const express = require('express');

const flashcardsController = require('../controllers/flashcard');

const router = express.Router();

// GET /api/flashcards
router.get('/flashcards', flashcardsController.getFlashcards);

// POST /api/flashcards
router.post('/flashcards', flashcardsController.createFlashcard);

// DELETE /api/flashcards/:id
 router.delete('/flashcards/:id', flashcardsController.deleteFlashcard);

// DELETE /api/pons/dictionaries
 router.get('/pons/dict', flashcardsController.getDictionaries);



module.exports = router;

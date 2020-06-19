const express = require('express');
const { body } = require('express-validator');

const flashcardsController = require('../controllers/flashcard');

const router = express.Router();

// GET /api/flashcards
router.get('/flashcards', flashcardsController.getFlashcards);

// POST /api/flashcards
router.post('/flashcards', flashcardsController.createFlashcard);

// DELETE /api/flashcards/:id
 router.delete('/flashcards/:id', flashcardsController.deleteFlashcard);

// GET /api/pons/dictionaries
 router.get('/pons/dict', flashcardsController.getDictionaries);

//  // GET /api/pons/translations
// router.get('/pons/translation', flashcardsController.getTranslation);

 // POST /api/pons/translations
router.post('/pons/translation', flashcardsController.postTranslation);

module.exports = router;

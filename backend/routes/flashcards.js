const express = require('express');
const { body } = require('express-validator');

const flashcardsController = require('../controllers/flashcard');

const router = express.Router();

router.get('/flashcards', flashcardsController.getFlashcards);

router.post('/flashcards', flashcardsController.createFlashcard);

 router.delete('/flashcards/:id', flashcardsController.deleteFlashcard);

 router.get('/pons/dict', flashcardsController.getDictionaries);

router.post('/pons/translation', flashcardsController.postTranslation);

router.get("/flashcards/:id", flashcardsController.getFlashcard);

router.put("/flashcards/:id", flashcardsController.editFlashcard);


module.exports = router;

const express = require('express');

const dictionaryController = require('../controllers/dictionary')

const router = express.Router();

router.get('/pons/dict', dictionaryController.getDictionaries);

module.exports = router;

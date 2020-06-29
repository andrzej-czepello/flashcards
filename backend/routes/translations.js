const express = require('express');

const translationController = require('../controllers/translation')

const router = express.Router();

router.post('/pons/translation', translationController.postTranslation);

module.exports = router;

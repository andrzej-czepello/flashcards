const request = require('request');
require("dotenv").config();

exports.postTranslation = (req, res, next) => {
    const options = {
    url: 'https://api.pons.com/v1/dictionary',
    method: 'GET',
    headers: { 'X-Secret': `${process.env.PONS_API_KEY}`},
    qs: {'l': req.body.languages, 'q': req.body.word}
  }

  request(options, (error, response, body) => {
    if(body){
      res.status(200).json({
        message: "Translations received",
        translations: JSON.parse(body)
    });
    }else{
      res.status(204).json({
        message: "No translations available",
        translations: []
    });
    }}
  );
}

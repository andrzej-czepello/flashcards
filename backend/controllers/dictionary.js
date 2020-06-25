const request = require('request');

exports.getDictionaries = (req, res, next) => {

  const options = {
    url: 'https://api.pons.com/v1/dictionaries',
    method: 'GET',
    qs: {'language': 'en'}
  }
  request(options, (error, response, body) => {
        res.status(200).json({
          message: "Translation received",
          dictionaries: JSON.parse(body)
        });
      }
  );
}

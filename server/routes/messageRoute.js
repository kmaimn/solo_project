var express = require('express');
var router = express.Router();
var twilio = require('twilio')

var client = new twilio.RestClient('', '');

router.post('/', function (req, res) {

  var ingredients = req.body.join('\n');

  client.sendMessage({
    to: '+',
    from: '+',
    body: 'Can you pick up...' + '\n' + ingredients
  }, function (err, data) {
    if (err) {
      console.log('Oops..', err);
      res.sendStatus(500);
    }else {
      console.log('This worked..?');
      res.sendStatus(201);
    }

  });

});

module.exports = router;

var express = require('express');
var router = express.Router();
var twilio = require('twilio')

var client = new twilio.RestClient('ACae74232f42748c1da9828a88e7b3fb22', 'cbf41201d61bbd0ae89b19f9db13f21d');

//POST to server, sends text;
router.post('/', function (req, res) {

  var ingredients = req.body.join('\n');

  client.sendMessage({
    to: '+17632187211',
    from: '16122604034',
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

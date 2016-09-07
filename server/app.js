var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//define routes here;
var foodRoutes = rquire('./routes/foodRoutes');

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, './public')));

//set app.use for route here;
app.use('/foodRoutes', foodRoutes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.set('port', 5000);

app.listen(process.env.PORT || app.get('port'), function () {
  console.log('Listening on port:', app.get('port'));
});

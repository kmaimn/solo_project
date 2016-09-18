var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = '';

//If we are running on Heroku, use the remote database (with SSL)
if (process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + '?ssl=true';
} else {
  // running locally, use our local database instead
  connectionString = 'postgres://localhost:5432/recipes';
}

//GET current ingredients;
router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM inventory ORDER BY item ASC;', function (err, result) {
      done();

      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

//POST new food items to DB
router.post('/result', function (req, res) {
  var newFood = req.body;
  console.log('new item added:', newFood);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('INSERT INTO inventory (item, category) ' + 'VALUES ($1, $2)',
    [newFood.item, newFood.category],
    function (err, result) {
      done();

      if (err) {
        console.log(err);
        res.sendStatus(500);
      }else {
        res.sendStatus(201);
      }
    });
  });
});

//POST new favorite to DB
router.post('/favorite', function (req, res) {
  var newFavorite = req.body;
  console.log('new favorite added:', newFavorite);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('INSERT INTO favorite (image, label, url, source, ingredients) ' + 'VALUES ($1, $2, $3, $4, $5)',
    [newFavorite.image, newFavorite.label, newFavorite.url, newFavorite.source, newFavorite.ingredients],
    function (err, result) {
      done();

      if (err) {
        console.log(err);
        res.sendStatus(500);
      }else {
        res.sendStatus(201);
      }
    });
  });
});

//GET current favorites;
router.get('/favorite', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM favorite;', function (err, result) {
      done();

      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

//DELETE favorite;
router.delete('/favorite/:name', function (req, res) {
  var id = req.params;
  console.log(id);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM favorite ' + 'WHERE label = $1', [id.name], function (err, result) {
      done();

      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }

      res.sendStatus(200);
    });
  });
});

//DELETE favorite;
router.delete('/:name', function (req, res) {
  var id = req.params;
  console.log(id);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM inventory ' + 'WHERE item = $1', [id.name], function (err, result) {
      done();

      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }

      res.sendStatus(200);
    });
  });
});

module.exports = router;

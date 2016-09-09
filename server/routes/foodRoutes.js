var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/recipes';

//GET current inventory(ingredients in house);
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

// router.post('/', function (req, res) {
//   var newFood = req.body;
//   console.log('new item added:', newFood);
//
//   pg.connect(connectionString, function (err, client, done) {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//     client.query('INSERT INTO inventory (category, item) ' + 'VALUES ($1, $2)',
//     [newFood.category, newFood.name],
//     function (err, result) {
//       done();
//
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//       }else {
//         res.sendStatus(201);
//       }
//     });
//   });
// });

module.exports = router;

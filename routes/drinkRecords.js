var express = require('express');
var router = express.Router();

var DrinkRecord = require('../models/DrinkRecord');

router.get('/', (req, res) => {

    const from = req.query.from;

    DrinkRecord.getRecords(from).then((records) => {
        res.json(records);
    })

});

router.post('/', (req, res) => {

    const drink = req.body.drink;
    const date  = req.body.date;

    DrinkRecord.create(drink, date).then((record) => {
        res.json(record);
    }).catch((err) => {
        res.status(500).send(err);
    })

});

// router.get('/', (req, res) => {
//
//   Drink.find().then((drinks) => {
//     res.json(drinks);
//   })
//
// });
//
// router.post('/', (req, res) => {
//
//   if (req.body) {
//
//     const name = req.body.name;
//     const servingSize = req.body.servingSize;
//     const caffeine = req.body.caffeine;
//
//     Drink.create(name, servingSize, caffeine).then((drink) => {
//       res.json(drink);
//     }).catch((err) => {
//       res.status(500).send(err);
//     })
//
//   } else {
//     res.status().send('Missing parameters. Need name, serving size and caffeine');
//   }
//
// });
//
// router.delete('/:drink_id', (req, res) => {
//
//   Drink.remove(req.params['drink_id']).then(() => {
//     res.send(req.params['drink_id'] + " deleted");
//   })
//
// });

module.exports = router;

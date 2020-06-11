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

router.delete('/:record_id', (req, res) => {

    DrinkRecord.deleteRecord(req.params.record_id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })

});

// router.delete('/:drink_id', (req, res) => {
//
//   Drink.remove(req.params['drink_id']).then(() => {
//     res.send(req.params['drink_id'] + " deleted");
//   })
//
// });

module.exports = router;

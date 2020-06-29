var express = require('express');
var router = express.Router();

const Session = require('../models/Session');
var DrinkRecord = require('../models/DrinkRecord');

const authenticateUser = (req, res, next) => {

    const sessionId = req.cookies["sessionId"];

    if (sessionId) {
        console.log(sessionId);


        Session.getSession(sessionId).then(session => {
            req.user = session.user;
            return next();
        }).catch(err => {
            console.error(err);
        });

    } else {
        res.statusCode = 403;
        return next();
    }

};

router.get('/', authenticateUser, (req, res) => {

    const from = req.query.from;
    const user = req.user;

    if (user) {
        DrinkRecord.getRecords(user, from).then((records) => {
            res.json(records);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }

});

router.post('/', authenticateUser, (req, res) => {

    const drink = req.body.drink;
    const date  = req.body.date;
    const user = req.user;

    DrinkRecord.create(user, drink, date).then((record) => {
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

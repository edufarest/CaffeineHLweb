const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const Session = require('../models/Session');

router.post('/register', (req, res) => {

    const {username, password} = req.body;

    let u = new User({username: username});

    User.register(u, password, (err, user) => {
        if (err) {
            res.json({success: false, message: "Account could not be created. Error: ", err})
        } else {
            res.json({success: true, message: "Account has been created"});
        }
    })
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {

    const username = req.body.username;

    User.findOne({username: username}, (err, user) => {
        if (err) {
            res.sendStatus(403)
        }

        const id = user._id;

        Session.deleteSession(id).then(() => {

            Session.create(id).then(session => {

                // Created session

                console.log(session)

                res.cookie('sessionId', session._id, {
                    maxAge: 7*24*60*60
                });

                res.json({success: true});
            }).catch(err => {
                console.error(err);
                res.sendStatus(500);
            })

        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });


    });
    // Delete any existing sessions and create a new one




});

module.exports = router;

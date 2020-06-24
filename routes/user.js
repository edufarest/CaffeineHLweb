const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

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

    res.json({success: true});

});

module.exports = router;

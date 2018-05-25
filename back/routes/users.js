const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const mail = require('../services/mailService');
const mongoose = require('mongoose');
const userController = require('../controllers/user');
const templates = require('../services/templates');
//Delete
router.delete('/:userId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(response => {
            res.status(200).json({message: "User deleted"});
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
});

//Register
router.post('/register', (req, res, next) => {
    if ((!req.body.username) || (!req.body.password)) {
        res.json({
            success: false,
            message: 'No data for the user'
        });
    }

    let mailOptions = {
        from: '"Bandz administration" <maciej.czarnota@gmail.com>', // sender address
        to: '', // list of receivers
        subject: 'Welcome to Bandz System', // Subject line
        text: 'Hello world?' // plain text body
        // html: mailtemplate.resetPasswordTemplate(newPassword) // html body
    };
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

//check if user already exist
    User.find({username: req.body.username})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                console.log("Failed");
                res.json({
                    success: false,
                    message: 'User already exists with this email'
                })
            } else {
                User.addUser(newUser, (error, user) => {
                    if (error) {
                        res.json({
                            success: false,
                            message: 'Failed to register a user'
                        })
                    } else {
                        //send confirmation email
                        mailOptions.to = newUser.username;
                        mailOptions.html = templates.newUserTemplate(newUser);
                        mail.generateEmail(mailOptions);
                        res.json({
                            success: true,
                            message: 'User has been registered'
                        })
                    }
                })
            }
        })
});


//Authenticate
router.post('/authenticate', (req, res, next) => {
    if ((!req.body.username) || (!req.body.password)) {
        res.json({
            success: false,
            message: 'No data for the user'
        });
    }

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err)
            throw err;
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err)
                throw err;
            if (isMatch) {
                //create Token
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800  // 1 week
                });

                //send whole user object to front
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                    }
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Wrong password'
                });
            }
        })
    });
});
//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user})
});

//Check if user exist for reseting password
router.get('/:userEmail', userController.getOneUser);
//Sends password
router.get('/sendPassword/:userEmail', userController.sentNewPassword);
module.exports = router;

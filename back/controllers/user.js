const User = require('../models/user');
const mongoose = require('mongoose');
const generatePass = require('generate-password');
const bcrypt = require('bcryptjs');
const mail = require('../services/mailService');
const templates = require('../services/templates');
//GET INDIVIDUAL USER

exports.getOneUser = (req, res, next) => {
    const email = req.params.userEmail;
    User.find({username: email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(200).json({
                    success: 'sucess',
                    message: 'User found'
                })
            } else {
                res.status(404).json({
                    success: 'false',
                    message: 'User not found'
                })
            }
        })
};
exports.sentNewPassword = (req, res, next) => {
    let mailOptions = {
        from: '"Bandz administration" <maciej.czarnota@gmail.com>', // sender address
        to: '', // list of receivers
        subject: 'Welcome to Bandz System', // Subject line
        text: 'Hello world?' // plain text body
        // html: mailtemplate.resetPasswordTemplate(newPassword) // html body
    };
    const email = req.params.userEmail;
    User.find({username: email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                let hashedPassword;
                //generate new Password
                let newPassword = generatePass.generate({
                    length: 8,
                    numbers: true,
                    symbols: true,
                    uppercase: true,
                    strict: true
                });
                console.log(newPassword);
                //encrypt the pass
                bcrypt.hash(newPassword, 10, (err, hash) => {
                    if (err) {
                        return res.json({
                            sucess: "false",
                            message: err
                        })
                    } else {
                        User.update({username: email}, {$set: {password: hash}})
                            .exec()
                            .then(result => {
                                //change array to object since find method returns an array
                                const newUser = user[0];
                                mailOptions.to = newUser.username;
                                mailOptions.html = templates.resetPasswordTemplate(newPassword);
                                mail.generateEmail(mailOptions);
                                res.status(200).json({
                                    success: 'sucess',
                                    message: 'Password has been sent'
                                })
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    success: 'false',
                                    message: 'Password could not be changed'
                                })
                            })
                    }
                })
                //update DB
            } else {
                res.status(404).json({
                    success: 'false',
                    message: 'User not found'
                })
            }
        })
};


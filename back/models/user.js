const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hashPassword, callback) {
    //compare password with hashed password stored

    bcrypt.compare(candidatePassword, hashPassword, (err, isMatch) => {
        if (err) throw error;
        callback(null, isMatch)
    });
};

module.exports.addUser = function (newUser, callback) {
    console.log(newUser);
    //hashing the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        })
    });
};
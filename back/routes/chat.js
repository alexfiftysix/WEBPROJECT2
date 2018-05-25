const express =  require('express');
const router = express.Router();
const config = require('../config/database');
const Chat = require('../models/chat');
const mongoose = require('mongoose');
const chatController = require('../controllers/chat');
const passport = require('passport');

//DEFAULT CHAT
router.post('/', passport.authenticate('jwt', {session: false}),  chatController.setupChat);

//GET ALL MSGS from chat
router.get('/', passport.authenticate('jwt', {session: false}),  chatController.getMessages);

module.exports = router;
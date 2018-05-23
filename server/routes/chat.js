const express =  require('express');
const router = express.Router();
const config = require('../config/database')
const Chat = require('../models/chat');
const mongoose = require('mongoose');
const chatController = require('../controllers/chat');

//DEFAULT CHAT
router.post('/', chatController.setupChat);

//GET ALL MSGS from chat
router.get('/', chatController.getMessages);

module.exports = router
const paypal = require('../services/paypal');
const express =  require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
var cors = require('cors');
//POST 
router.post('/:EventId', passport.authenticate('jwt', {session: false}),  cors(), paypal.createPayment);
router.get('/execute', cors(), paypal.executePayment);
router.get('/cancel', paypal.cancelPayment);
module.exports = router;
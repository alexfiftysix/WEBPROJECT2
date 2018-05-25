const pdfService = require('../services/pdfService');
const express = require('express');
const router = express.Router();
var cors = require('cors');
const passport = require('passport');

//POST CREATE PDF
router.get('/', passport.authenticate('jwt', {session: false}), pdfService.generatePdf);

module.exports = router;
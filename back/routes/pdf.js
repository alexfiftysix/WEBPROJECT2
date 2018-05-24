const pdfService = require('../services/pdfService');
const express =  require('express');
const router = express.Router();
var cors = require('cors');

//POST CREATE PDF
router.get('/',  pdfService.generatePdf);

module.exports = router;
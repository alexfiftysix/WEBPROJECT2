const express =  require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Band = require('../models/band');
const mongoose = require('mongoose');
const multer = require('multer');
const bandsController = require('../controllers/bands');

//storage
const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'./uploads');
    },
    filename: function(req,file,callback){
        callback(null,new Date().toDateString()+file.originalname)
    }
});

//fileValidation  for Images
const fileFilter = (req,file,callback) =>{
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        callback(null,true);
    } else{
        callback(null,false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});
//DEFAULT

router.get('/', bandsController.bandsGetAll);

router.post('/', passport.authenticate('jwt', {session: false}),  upload.single('bandImage'), bandsController.createBand);

//INDIVIDUAL BAND

router.get('/:bandId',bandsController.getOneBand);

router.delete('/:bandId', passport.authenticate('jwt', {session: false}),  bandsController.deleteOneBand);

router.patch('/:bandId', passport.authenticate('jwt', {session: false}),  bandsController.modifyOneBand);

module.exports = router;

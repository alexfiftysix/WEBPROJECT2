const express =  require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Event = require('../models/event');
const mongoose = require('mongoose');
const eventController = require('../controllers/event');
const multer = require('multer');

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
router.get('/', eventController.eventsGetAll);

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), eventController.createEvent);

//INDIVIDUAL BAND

router.get('/:EventId', eventController.getOneEvent);

router.delete('/:EventId', passport.authenticate('jwt', {session: false}),  eventController.deleteOneEvent);

router.patch('/:EventId', passport.authenticate('jwt', {session: false}),  eventController.modifyOneEvent);

module.exports = router;
const express =  require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//DEFAULT
//get
router.get('/', (req,res,next) =>{
    res.status(200).json({
        message: 'Handling GET  requests for /places'
    })
});
//post
router.post('/', (req,res,next) =>{
    const place = {
        name: req.body.name,
        city: req.body.city,
        street: req.body.street,
        contactNumber: req.body.contactNumber,
        description: req.body.description
    };
    res.status(201).json({
        createdPlace: place
    })
});

//INDIVIDUAL PLACE
//get
router.get('/:placeId', (req,res,next) =>{
    const id = req.params.placeId;
    if(id=='special'){
        res.status(200).json({
            message: 'You discovered the special place',
            id: id
        })
    } else{
        res.status(200).json({
            message: 'You passed the ID'
        })
    }
    });
//delete
    router.delete('/:placeId', (req,res,next) =>{
        res.status(200).json({
            message: 'Updated place'
        })
    });
//patch
    router.patch('/:placeId', (req,res,next) =>{
        res.status(200).json({
            message: 'Place deleted'
         })
    });

module.exports = router;
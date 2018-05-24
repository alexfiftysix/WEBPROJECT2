const Event = require('../models/event');
const mongoose = require('mongoose');
const geoLocator = require('../services/geoLocator');
const moment = require('moment');
//GET ALL EVENTS
exports.eventsGetAll = (req, res, next) => {
    const query = req.query.query;
    let options;
    if (query) {
        console.log('query is not empty');
        options = {$or: [{name: query}, {venueName: query}, {locationName: query}]}
    } else {
        console.log('query is empty');
        options = {};
    }
    Event.find(options)
        .collation({locale: 'en', strength: 2})
        .select('headlinerId name price location venueName image date')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                events: docs.map(doc => {
                    return {
                        _id: doc._id,
                        headlinerId: doc.headlinerId,
                        name: doc.name,
                        price: doc.price,
                        location: doc.location,
                        venueName: doc.venueName,
                        date: moment(doc.date).format('L'),
                        image: "http://52.40.161.160:3000/" + doc.image,
                        description: doc.description,
                        request: {
                            type: "GET",
                            URL: "http://52.40.161.160:3000/events/" + doc._id
                        }

                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

//CREATE AN EVENT
exports.createEvent = (req, res, next) => {
    let coordinates;
    //Convert Location to coordinates
    geoLocator.geocode(req.body.location)
        .then(function (result) {
            //Create and store the event
            const event = new Event({
                _id: new mongoose.Types.ObjectId(),
                headlinerId: req.body.headlinerId,
                name: req.body.name,
                price: req.body.price,
                locationName: req.body.location,
                venueName: req.body.venueName,
                image: req.file.path,
                date: req.body.date,
                description: req.body.description,
                location: {
                    city: result[0].city,
                    coordinates: [result[0].latitude, result[0].longitude]
                }
            });
            //save the event to DB
            event.save().then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Event created sucesfully",
                    createdEvent: {
                        _id: result._id,
                        headlinerId: result.headlinerId,
                        name: result.name,
                        price: result.price,
                        location: result.location,
                        venueName: result.venueName,
                        image: result.image,
                        date: result.date,
                        request: {
                            type: "GET",
                            URL: "http://52.40.161.160:3000/events/" + result._id
                        }
                    }
                })
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err})
                });
        })
        .catch(function (err) {
            res.status(500).json({message: 'Location not found. Event could not be created'});
        });
};
//GET INDIVIDUAL EVENT
exports.getOneEvent = (req, res, next) => {
    const id = req.params.EventId;
    Event.findById(id)
        .select('headlinerId name price location venueName date image description')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({"message": "No valid entry found for provided event ID"})
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
};

//DELETE INDIVIDUAL EVENT
exports.deleteOneEvent = (req, res, next) => {
    const id = req.params.EventId;
    //remove any event that has this id
    Event.remove({_id: id})
        .exec()
        .then(results => {
            console.log(results);
            res.status(200).json(results);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
};

//MODIFY INDIVIDUAL EVENT
exports.modifyOneEvent = (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    //for each property check if we want to update
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    //update any event that has this id
    Event.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
};
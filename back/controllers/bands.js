const Band = require('../models/band');
const mongoose = require('mongoose');
//GET ALL BANDS
exports.bandsGetAll = (req, res, next) => {
    const query = req.query.query;
    let options;
    if (query) {
        console.log('query is not empty');
        options = {$or: [{name: query}, {genre: query}, {city: query}]}
    } else {
        console.log('query is empty');
        options = {};
    }
    Band.find(options)
        .collation({locale: 'en', strength: 2})
        .select('name  rating genre price contactNumber availability city description music image')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bands: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        genre: doc.genre,
                        price: doc.price,
                        rating: doc.rating,
                        contactNumber: doc.contactNumber,
                        availability: doc.availability,
                        city: doc.city,
                        description: doc.description,
                        music: doc.music,
                        image: "http://52.40.161.160:3000/" + doc.image,
                        request: {
                            type: "GET",
                            URL: "http://52.40.161.160:3000/bands/" + doc._id
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

//CREATE A BAND
exports.createBand = (req, res, next) => {
    if (!req.body.name || !req.body.genre || !req.body.price || !req.body.contactNumber
        || !req.body.city || !req.body.description || !req.body.image){
        res.json({
            success: false,
            message: 'Required fields not filled'
        });
    }
    //Create and store the band
        const band = new Band({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            genre: req.body.genre,
            price: req.body.price,
            contactNumber: req.body.contactNumber,
            availability: req.body.availability,
            rating: req.body.rating,
            city: req.body.city,
            description: req.body.description,
            music: req.body.music,
            image: req.file.path
        });
    //save the band to DB
    band.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Band created successfully",
            createdBand: {
                _id: result._id,
                name: result.name,
                genre: result.genre,
                price: result.price,
                contactNumber: result.contactNumber,
                availability: true,
                city: result.city,
                rating: result.rating,
                description: result.description,
                music: result.music,
                image: result.image,
                request: {
                    type: "GET",
                    URL: "http://52.40.161.160:3000/bands/" + result._id
                }
            }
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
};

//GET INDIVIDUAL BAND
exports.getOneBand = (req, res, next) => {
    const id = req.params.bandId;
    Band.findById(id)
        .select('name rating  genre price contactNumber availability city description music image')
        .exec()
        .then(doc => {
            doc.image = "http://52.40.161.160:3000/" + doc.image;
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({"message": "No valid entry found for provided band ID"})
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
};

//DELETE INDIVIDUAL BAND
exports.deleteOneBand = (req, res, next) => {
    const id = req.params.bandId;
    //remove any band that has this id
    Band.remove({_id: id})
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

//MODIFY INDIVIDUAL BAND
exports.modifyOneBand = (req, res, next) => {
    const id = req.params.bandId;
    const updateOps = {};
    //for each property check if we want to update
    for (const ops of req.body) {
        console.log(req.body);
        updateOps[ops.propName] = ops.value;
    }
    //update any band that has this id
    Band.update({_id: id}, {$set: updateOps})
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
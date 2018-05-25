const mongoose = require('mongoose');
const multer = require('multer');
//productSchema
const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    headlinerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Band', required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    locationName: {type: String, required: true},
    venueName: {type: String, required: true},
    location: {
        type: {type: String, default: "Point"},
        city: {type: String},
        coordinates: {type: [Number]}
    },
    date: {type: Date, required: true},
    image: {type: String, required: true},
    description: {type: String, required: false}
});

// db.events.createIndex( { "locationName" : 1 , "name" : 1, "venueName": 1},
//                            { collation: {
//                                locale : 'en',
//                                strength : 2
//                              }
//                            } );
//model (name of the model, data provided)
const Event = module.exports = mongoose.model('Event', eventSchema);
const mongoose = require('mongoose');
const multer = require('multer');
//productSchema
const bandSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number},
    contactNumber: {type: Number, required: true},
    availability: {type: Boolean, required: false},
    city: {type: String, required: true},
    description: {type: String, required: true},
    music: {type: String, required: false},
    image: {type: String, required: true}
});

const Band = module.exports = mongoose.model('Band', bandSchema);



//creating an index
// db.bands.createIndex( { "city" : 1 , "name" : 1, "genre": 1},
//                            { collation: {
//                                locale : 'en',
//                                strength : 2
//                              }
//                            } );
// model (name of the model, data provided)
const mongoose = require('mongoose');
//chatSchema
const chatSchema = mongoose.Schema ({
    created: Date,
    content: String,
    username: String
});

const Chat = module.exports = mongoose.model('Chat', chatSchema);
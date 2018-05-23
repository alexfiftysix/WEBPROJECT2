const Chat = require('../models/chat');
const mongoose = require('mongoose');

//SETUP A DEFAULT CHAT
exports.setupChat = (req,res,next) =>{
    //data for chat for the first time the website loads
    let chatData = {
        created: new Date(),
        content: 'Hello "name of the band"',
        username: 'email of the account'
      };
        //Create an instance of the chat model
        const defaultChat = new Chat(chatData);
        //save chat to DB
        defaultChat.save().then(result=>{
            console.log(result);
            res.status(201).json({
                message: "Chat saved succesfully",
                createdChat: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err})
        });  
};

// SEND MSG
// This route fetches a list of messages from db
exports.getMessages = (req,res,next) =>{
    //Find messages for chat
    Chat.find({})
    .exec()
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });
};
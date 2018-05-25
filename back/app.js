const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database'); 
const nodemailer = require('nodemailer');
const morgan = require('morgan');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

// stop self-signed cert bug
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//Connect to database
mongoose.connect(config.database, function(err,db){

if(err){
    throw err;
}

//Checking for connection if it's on
mongoose.connection.on('connected', ()=>{
    console.log("Connected to database " + config.database);
    
});
//Checking if there is an error with connection to database
//Checking for connection if it's on
mongoose.connection.on('error', (error)=>{
    console.log("Something bad happened with database connection: " + error);
});

//Redirects end point routes if starts with those words
const pdf = require('./routes/pdf');
const users = require('./routes/users');
const bands = require('./routes/bands');
const places  = require('./routes/places');
const events = require('./routes/events');
const paypal = require('./routes/paypal');
const chat = require('./routes/chat');

//all the requests are put to on console
app.use(morgan('dev'));

//Port Number
const port = process.env.port || 3000;

//Set static folder
app.use(express.static(path.join(__dirname,'front')));
app.use('/uploads', express.static('uploads'));

//CORS MiddleWare
app.use(cors());

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

//Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//All handle routes
app.use('/users', users);
app.use('/bands', bands);
app.use('/places',places);
app.use('/events',events);
app.use('/pay',paypal);
app.use('/chat', chat);
app.use('/pdf', pdf);
//Index Route
app.get('/', (req,res)=>{
    res.send("Invalid endpoint");
 });
 
//If passed to this line then it means the route was not handled
app.use((req,res,next)=>{
    const error = new Error(' Route was Not found');
    error.status = 404;
    next(error);
});
//some other errors
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

});

wss.on('connection', function(ws){
    //checks if connection is alive
    ws.isAlive = true;
    //handle errors
    ws.on('error', () => console.log('Connection closed'));

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    //connection is up, add a simple simple event when receiving message
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        let convertedMessage = JSON.parse(message);
        if (convertedMessage.isBroadcast) {
            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(message);
                    }    
                });
            
        } 
    });
    setInterval(() => {
        wss.clients.forEach((ws) => {
            
            if (!ws.isAlive) return ws.terminate();
            
            ws.isAlive = false;
            ws.ping(null, false, true);
        });
    }, 1000);
});
//Start Server
server.listen(port, () => {
    console.log("Server has started on port " + port);
})
});

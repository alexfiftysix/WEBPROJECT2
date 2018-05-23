const paypal =  require('paypal-rest-sdk');
const Event = require('../models/event');
const pdf = require('./pdfService');

//CONFIGURATION
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 
  'AVzATSREmDtbO4O94S2LnU2t8oNdio2AYEuzFYmjwd4Le3GL_IH-ZQErFBlZfjJsG5oUCRnQTqGtkrxS',
  'client_secret': 
  'ECzyNqqdo-cx4YLnucxA9ZTSpIS2wifOTpC2Puim9aYcSVKaE2TNhlDKUEXLm3xSXnBxC5Gzq4JiNaGe'
});
//CREATE PAYMENT

let eventPrice; // stores price for the item
module.exports.createPayment = (req,res) =>{
 const eventId = req.params.EventId;
 Event.findById(eventId)
    .select('name  price ')
    .exec()
    .then(doc => {
        eventPrice = doc.price;
        eventName = doc.name;
        const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/pay/execute",
            "cancel_url": "http://localhost:3000/pay/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": eventName,
                    "sku": "001",
                    "price": eventPrice,
                    "currency": "AUD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "AUD",
                "total": eventPrice
            },
            "description": "This is the payment description for the ticket at " + eventName
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment);
            res.send(payment);
        }
    });
    })
    }
//EXECUTE PAYMENT
module.exports.executePayment = (req,res,next) => {
    console.log('execute Payment');
    const payment_Id = req.query.paymentId;
    const payerId = req.query.PayerID;
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "AUD",
                "total": eventPrice
            }
        }]
    };
    
    var paymentId = payment_Id;
    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            res.status(500).json({
                message : "Payment has been unsucessfull",
                success : "false"
            });
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.status(200);
            //TO DO CREATE PDF TICKET and send to your email
            // pdf.generatePdf('mac','aa','aa','2019');
            res.redirect('http://localhost:4200/#/main/');
        }
    });
}

module.exports.cancelPayment = (req,res,next) => {
    res.redirect('http://localhost:4200/#/main');
}
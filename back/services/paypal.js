const paypal = require('paypal-rest-sdk');
const Event = require('../models/event');
const pdf = require('./pdfService');
const mail = require('./mailService');
const mailtemplate = require('./templates');
var path = require("path");
//CONFIGURATION
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id':
        'AVzATSREmDtbO4O94S2LnU2t8oNdio2AYEuzFYmjwd4Le3GL_IH-ZQErFBlZfjJsG5oUCRnQTqGtkrxS',
    'client_secret':
        'ECzyNqqdo-cx4YLnucxA9ZTSpIS2wifOTpC2Puim9aYcSVKaE2TNhlDKUEXLm3xSXnBxC5Gzq4JiNaGe'
});
//CREATE PAYMENT

let eventPrice, eventName, eventLocation, venueName, eventDate, eventPhoto;

module.exports.createPayment = (req, res) => {
    const eventId = req.params.EventId;
    Event.findById(eventId)
        .select('name  price location venueName date image ')
        .exec()
        .then(doc => {

            eventPrice = doc.price;
            eventName = doc.name;
            eventLocation = doc.location;
            venueName = doc.venueName;
            eventDate = doc.date;
            eventPhoto = doc.image;

            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://52.40.161.160:3000/pay/execute",
                    "cancel_url": "http://52.40.161.160:3000/pay/cancel"
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
};
//EXECUTE PAYMENT
module.exports.executePayment = (req, res, next) => {
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
                message: "Payment has been unsucessfull",
                success: "false"
            });
            throw error;
        } else {
            console.log(payment);
            res.status(200);
            //create PDF and attach to email
            var filepath = path.join('./pdfs/', 'Ticket_' + eventName.replace(' ', '-') + '.pdf');
            let customerName = payment.payer.payer_info.first_name + ' ' + payment.payer.payer_info.last_name;
            pdf.generatePdf(eventName, eventDate, eventLocation, eventPhoto, eventPrice, customerName);
            let mailOptions = {
                from: '"Bandz administration" <maciej.czarnota@gmail.com>', // sender address
                to: payment.payer.payer_info.email, // list of receivers
                subject: 'Confirmation for ' + eventName + ' gig', // Subject line
                text: 'Hello world?', // plain text body
                html: mailtemplate.pdfTemplate, // html body
                attachments: [{
                    filename: 'Ticket_' + eventName,
                    path: filepath,
                    contentType: 'application/pdf'
                }]
            };
            //generate email
            mail.generateEmail(mailOptions);
            res.redirect('http://52.40.161.160/#/main/');
        }
    });
};

module.exports.cancelPayment = (req, res, next) => {
    res.redirect('http://52.40.161.160/#/main');
};
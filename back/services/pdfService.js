const pdfKit = require('pdfkit');
const fs = require('fs');
const moment = require('moment');

exports.generatePdf = (eventName, eventDate, eventAddress, eventPhoto, eventPrice, customerName) => {

   var doc = new pdfKit({ layout : 'portrait', margins: { top: 50, bottom: 50, left: 72, right: 72 }, info: {
    Title 	: 'Ticket for event at ' + eventName ,
    Author 	: 'Bandz Administration',
    Subject 	: 'Gig ticket',
    ModDate   : new Date(Date.now()).toLocaleString()
}}),
    eventName = eventName,
    name =	'Ticket_' + eventName,
    date =	moment(eventDate).format('L'),
    price =	'PRICE: $' + eventPrice,
    clientName = customerName,
    eventLocalization = eventAddress

    /* Replace any spaces within the name value with dashes instead */
    name = name.replace(' ', '-');

    /* Define the directory location and name of the generated PDF document */
    doc.pipe(fs.createWriteStream('pdfs/' + name + '.pdf'));
//set ticket
    doc.fontSize(40).text('TICKET', 200), {
        width: 410,
        align: 'justify'
    };
    doc.moveDown(0, 5);
//set header
    doc.fontSize(35).text(eventName), {
        width: 410,
        align: 'center'
    };
    doc.moveDown(0, 5);
//set location for event
    doc.fontSize(25).text(eventLocalization.city.replace("\'", '')), {
        width: 310,
        align: 'center'
    };
    doc.moveDown(0, 5);
//set date for event
    doc.fontSize(20).text(date), {
        width: 310,
        align: 'center'
    };
    doc.moveDown(0, 5);
//set customer name
    doc.fontSize(20).text(clientName), {
        width: 310,
        align: 'center'
    };
    doc.moveDown(1);
//set price for event
doc.fontSize(25).text( price), {
  width:310,
  align: 'center'
};
doc.moveDown(0,5);


    /* Finalise the PDF */
    doc.end();
};

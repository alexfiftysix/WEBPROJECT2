const pdf = require('pdfkit');
const fs = require('fs');


exports.generatePdf = function (eventName,venueName,venueAddress, date) {

let myDoc = new pdf;
myDoc.pipe(fs.createWriteStream('ticket.pdf'));

// Set a title 
myDoc.fontSize(25).text('Bandz presents', 100, 100)
.moveDown(0.5);
//Set event name
myDoc.fontSize(35).text(eventName)
.moveDown();
// Set the venue name 
myDoc.fontSize(15)
.text(venueName, {
    width: 410,
    align: 'center'
}).moveDown(0.5);
//Set venue adress
myDoc.fontSize(12)
.text(venueAddress, {
    width: 410,
    align: 'center'
}).moveDown();

//set general admission
myDoc.fontSize(15)
.text('GENERAL ADMISSION', {
    width: 410,
    align: 'center'
}).moveDown(0.5);
myDoc.fontSize(13)
.text('AGES 21 AND OVER', {
    width: 410,
    align: 'center'
}).moveDown(0.5);
//set date event
myDoc.fontSize(15)
.text(date, {
    width: 410,
    align: 'center'
}).moveDown();
//set no refunds
myDoc.fontSize(15)
.text('NO REFUNDS/NO EXCHANGES', {
    width: 410,
    align: 'center'
}).moveDown();
myDoc.image('../uploads/band2.jpg', 400, 80, {width: 200});
myDoc.end();
res.download('ticket.pdf');
}

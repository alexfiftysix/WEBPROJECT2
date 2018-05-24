const pdfKit = require('pdfkit');
const fs = require('fs');


exports.generatePdf = (req,res) =>{

/* Create a pdfKit object that defines the following properties:
    *
    * 1. Document orientation
    * 2. Document margins
    * 3. Document metadata (Title, Author, Subject and Date last modified)
    */
   var doc 				= 	new pdfKit({ layout : 'portrait', margins: { top: 50, bottom: 50, left: 72, right: 72 }, info: {
    Title 	: 'My fabulous document',
    Author 	: 'Saints at Play Limited',
    Subject 	: 'Demonstrating PDF Kit abilities',
    ModDate   : new Date(Date.now()).toLocaleString()
}}),

    /* Retrieve the values for the MongoDB document - from the
       posted data within the Ionic mobile application - that we
       wish to embed within the generated PDF document */
     name 			=	'Maciej1'
    description 		=	'Cos opis',
    displayed 		=	'yep',
    date 			=	Date.now();


/* Replace any spaces within the name value with dashes instead */
name 				= name.replace(' ', '-');


/* Define the directory location and name of the generated PDF document */
doc.pipe(fs.createWriteStream('pdfs/' + name + '.pdf'));

doc.text('asasasas');
/* Embed image within the document as follows:
   image(image to be embedded, x axis position, y axis position, fit image to specified dimensions) */
// doc.image(thumbnail, 25, 25, {
//    fit 		: [320, 240]
// });


/* Embed specific font, define font size and add text as follows:
   text(value to be displayed, x axis position, y axis position) */
// doc.font('fonts/Diavlo_bold.otf')
// .fontSize(18)
// .text(name, 25, 285);


// /* Embed specific font, define font size and add text as follows:
//    text(value to be displayed, x axis position, y axis position) */
// doc.font('fonts/delicious_bold.otf')
// .fontSize(16)
// .text(description, 25, 310);

/* Finalise the PDF */
doc.end();







  // var doc;

  // doc = new pdfKit();

  // // Set some headers
  // res.statusCode = 200;
  // res.setHeader('Content-type', 'application/pdf');
  // res.setHeader('Access-Control-Allow-Origin', '*');

  // // Header to force download
  // res.setHeader('Content-disposition', 'attachment; filename=Maciej.pdf');
  // doc.info['Title'] = 'Test Document';
  // doc.pipe(res);

  // doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);

  // doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');

  // doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();

  // doc.addPage().fillColor('blue').text('Here is a link!', 100, 100).underline(100, 100, 160, 27, {
  //   color: '#0000FF'
  // }).link(100, 100, 160, 27, 'http://google.com/');

  // doc.end();
};

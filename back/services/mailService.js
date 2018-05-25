const nodemailer = require('nodemailer');

module.exports = {
    generateEmail: function (options) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'maciej.czarnota@gmail.com', // generated ethereal user
                pass: 'Boros_Signet23' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = options;
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log("There was an error while sending an email" + error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
};
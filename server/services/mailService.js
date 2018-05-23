const nodemailer = require('nodemailer');

module.exports = {
    generateEmail: function (userSendMailAdress, template) {
        var mail = template;
       // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'maciej.czarnota@gmail.com', // generated ethereal user
          pass: 'Xin2014!' // generated ethereal password
      }
      // tls: {

      // }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Bandz administration" <maciej.czarnota@gmail.com>', // sender address
      to:  userSendMailAdress.username, // list of receivers
      subject: userSendMailAdress.username + ', welcome to BANDZ!', // Subject line
      text: 'Hello world?', // plain text body
      html: mail // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}
}
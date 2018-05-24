const accountSid = 'AC5c7593a92a2191e3eafa444d595eaa5f';
const authToken = 'e34ce442e1278e1fd68d1cb60d4d0910';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Congratulations your band was invited to play a gig at ' + eventName +'. Call back the owner to set up the meeting!',
     from: '+61437544331',
     to: '+61403641053'
   })
  .then(message => console.log('Message has been sent'))
  .done();



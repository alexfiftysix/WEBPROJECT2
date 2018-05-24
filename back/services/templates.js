exports.newUserTemplate = function (accountInfo){
        return `
        <h1> THE NIGHT LIFE AWAIT!</h1>
      <p> Congratulations on your acceptance into Bandz!
       Here you will be able to register your band, llook for events or 
       even communicate with your favorite band and allow them to play at 
       your place! </p>

       <h2>Your account summary: </h2>
       <p> <b>username:</b> ${accountInfo.username} </p> 
       <p> Can't wait to see you in our Bandz family! </p>
        `
}

exports.resetPasswordTemplate = function (password){
        return `<p> <b>new password:</b> ${password}  </p>`
}

exports.pdfTemplate = 
        `<h1> Thanks for your order</h1>
        <p> Thanks for purchasing the ticket to one of our events!. Hope you will
        have a great time listening to the best music!! </p>
        <p>We attached the ticket. Please print it before going to the gig.</p>
        <p>Thanks so much!!</p>`

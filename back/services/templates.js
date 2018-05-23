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
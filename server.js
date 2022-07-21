const nodemailer = require("nodemailer")
require('dotenv').config()
//step1
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'hai.warungku@gmail.com',
        pass: "yricxuevjzvsyxxm"
    }
})

//step2
let mailOptions = {
    from: "hai.warungku@gmail.com",
    to: "ayik.1001@gmail.com",
    subject: 'testing bro',
    text: "it works"
}

//step3
transporter.sendMail(mailOptions)
    .then(data => console.log("email sent!"))
    .catch(err => console.log("error!"))
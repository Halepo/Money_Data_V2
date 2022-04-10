require("dotenv").config();
const nodemailer = require('nodemailer');

module.exports.nodeMailer = function (toEmail, subject, msg) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
      
      var mailOptions = {
        from: 'foo.aleph@gmail.com',
        to: toEmail,
        subject: 'Email from Asketari',
        text: 'test',
        html: msg
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
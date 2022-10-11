'use strict';
module.exports.formateForMail = function (type, textInput) {
    let msg = '';
    switch (type) {
        case 'forgotPassword':
            msg = '<p style="font-size:15px;">We received a request to change the password associated with this e-mail address</p><p style="font-size:25px;">Please click  the link that is given below</p><a href = "http://localhost:4001/resetpassword?index=' + textInput + '">Click me!!</a><p>Thank You</p>';
            return msg
        case 'verifyEmail':
            msg = '<p style="font-size:15px;">Email verification.</p><p style="font-size:25px;">Please click  the link that is given below</p><a href = "http://localhost:4001' + textInput + '">Click me!!</a><p>Thank You</p>';
            return msg
        case 'resetPassword':
            msg = '<p style="font-size:15px;">Password Reset Successfully</p>';
            return msg
        case 'postJob':
            msg = '<p style="font-size:15px;">New job for +' + textInput + ' posted.</p>';
            return msg
        case 'inviteSignup':
            msg = 'Invitation to create an account on Money Data';
            return msg
        default:
            return 'HELLO';
    }
}
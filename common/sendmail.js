const nodemailer = require('nodemailer');
const { mailConfig } = require('../config/config');
const { SUBJECT_CONFIRM_EMAIL } = require('../common/constant');
const jwt = require('jsonwebtoken');


/* SEND EMAIL */
const sendEmail = (emailSubject, toEmail, htmlText) => {

    const transport = nodemailer.createTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: `${mailConfig.appEmail}`,
            pass: `${mailConfig.appEmailPass}`
        }
    });

    const mailOptions = {
        from: `${mailConfig.appEmail}`,
        to: toEmail,
        subject: emailSubject,
        html: htmlText
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return error;
        }
        console.log('Email has been sent: ' + info.response);
        return info;
    });

};


/* EMAIL VARIFICATION */
const sendEmailVerification = function (req, user) {
    // issue token
    const payload = {
        id: user.id,
        email: user.email,
    };

    const registerToken = jwt.sign(payload, mailConfig.appEmailTokenSecret, { expiresIn: '1h' });
    const link = `${req.protocol}://${req.headers.host}/user/registration/${registerToken}`;
    const htmlText = `<h3>Hi ${payload.email}, welcome to My APP!</h3><br />Please, verify your email<br /><br /><b><a href='${link}'>Verify Now!</a></b>`;

    try {
        sendEmail(SUBJECT_CONFIRM_EMAIL, payload.email, htmlText);
        console.log(`Success sent verification Email to ${payload.email}`);
    }
    catch (err) {
        console.log(err.message);
        console.log(`Failed send email to ${payload.email}`);
    }
};



module.exports = {
    sendEmail,
    sendEmailVerification
}
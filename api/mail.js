const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


const auth = {
        auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN
        }
    };

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, text, cb) => {
    const mailOptions = {
        sender: name,
        from: email,
        to: 'sshrey183@gmail.com',
        text: text,
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log(err);
            cb(err, null);
        } else {
            cb(null, data);
        }
    });


}
// Exporting the sendmail
module.exports = sendMail;
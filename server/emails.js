const nodemailer = require("nodemailer");
const EmailTemplate = require('email-templates-v2').EmailTemplate;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testingscoreboard@gmail.com',
        pass: '#123456abc'
    }
});

const sendSubmissionEmail = transporter.templateSender(
    new EmailTemplate( __dirname +'/email_templates/testMailTemplate'), {
        from: 'testingscoreboard@gmail.com',
    });

function sendEmail (email, username, name, tokenUrl) {
    // transporter.template
    sendSubmissionEmail({
        to: "shannon.axelrod@chanzuckerberg.com", //email variable would go here
        subject: 'Submission Received'
    }, {
        userName: "WHADUP TESTING",
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n'+ JSON.stringify(info));
        }
    });
};


module.exports = {
    sendEmail
};

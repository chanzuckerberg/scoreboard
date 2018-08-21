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
    new EmailTemplate('/Users/shannonaxelrod/dev/scoreboard/server/email_templates/testMailTemplate'), {
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

// const mailOptions = {
//     from: 'testingscoreboard@gmail.com',
//     to: 'shannon.axelrod@chanzuckerberg.com',
//     subject: 'Scoreboard Submission Received',
//     text: "Thank you! Your submission is now in review. We will send you another email  when it is approved."
// };
//
// function sendEmail(email, template) {
//     const hi = "test";
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }

module.exports = {
    sendEmail
};

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
    new EmailTemplate( './email_templates/submissionEmail'), {
        from: 'testingscoreboard@gmail.com',
    });

const sendApprovedEmail = transporter.templateSender(
    new EmailTemplate( './email_templates/approvedEmail'), {
        from: 'testingscoreboard@gmail.com',
    });

const submissionToReviewEmail = transporter.templateSender(
    new EmailTemplate( './email_templates/submissionToReviewEmail'), {
        from: 'testingscoreboard@gmail.com',
    });

const EmailType = {
    SUBMISSION: sendSubmissionEmail,
    APPROVED: sendApprovedEmail,
    NEEDS_REVIEW: submissionToReviewEmail};


function sendEmail(emailTransporter, userID) {
    emailTransporter({
        to: "shannon.axelrod@chanzuckerberg.com", //email variable would go here
        subject: 'Submission Received'
    }, {
        userName: "WHADUP TESTING",
        teamName: "Chan Zuckerberg"
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};


module.exports = {
    EmailType,
    sendEmail
};

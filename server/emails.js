const nodemailer = require("nodemailer");
const EmailTemplate = require('email-templates-v2').EmailTemplate;
const db = require("./db.js");


var emailSettings;
var transporter;
var submissionEmail;
var approvedEmail;
var submissionToReviewEmail;


db.getAdminEmailSettings().then(data => {
    emailSettings = data;
    transporter = nodemailer.createTransport({
        service: emailSettings["email_provider"],
        auth: {
            user: emailSettings["email_address"],
            pass: emailSettings["email_pass"]
        }
    });

    submissionEmail = transporter.templateSender(
        new EmailTemplate( './email_templates/submissionEmail'), {
            from: emailSettings["email_address"],
        });

    approvedEmail = transporter.templateSender(
        new EmailTemplate( './email_templates/approvedEmail'), {
            from: emailSettings["email_address"],
        });

    submissionToReviewEmail = transporter.templateSender(
        new EmailTemplate( './email_templates/submissionToReviewEmail'), {
            from: emailSettings["email_address"],
        });
});


function sendApprovedEmail(submitterEmail) {
    approvedEmail({
        to: submitterEmail,
        subject: 'Your Submission has been approved'
    }, {
        linkToSubmission: "?",
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
}


function sendSubmissionToReviewEmail() {
    submissionToReviewEmail({
        to: emailSettings["email_address"],
        subject: 'New Submission Needs Review'
    }, {
        linkToReview: "?",
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
}

function sendSubmissionEmails(user) {
    // const user = req.user;
    submissionEmail({
        to: user.email,
        subject: 'Submission Received'
    }, {
        userName: user.github_username,
        teamName: "Chan Zuckerberg"
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
            sendSubmissionToReviewEmail()
        }
    });
}

module.exports = {
    sendSubmissionEmails,
    sendApprovedEmail
};

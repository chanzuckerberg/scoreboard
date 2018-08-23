const nodemailer = require("nodemailer");
const EmailTemplate = require('email-templates-v2').EmailTemplate;

const scoreboardAdminEmail = process.env.SCOREBOARD_ADMIN_EMAIL;
const scoreboardAdminEmailProvider = process.env.SCOREBOARD_ADMIN_EMAIL_PROVIDER;
const scoreboardAdminPass = process.env.SCOREBOARD_ADMIN_PASS;

const transporter = nodemailer.createTransport({
    service: scoreboardAdminEmailProvider,
    auth: {
        user: scoreboardAdminEmail,
        pass: scoreboardAdminPass
    }
});

const submissionEmail = transporter.templateSender(
    new EmailTemplate( './email_templates/submissionEmail'), {
        from: scoreboardAdminEmail,
    });

const approvedEmail = transporter.templateSender(
    new EmailTemplate( './email_templates/approvedEmail'), {
        from: scoreboardAdminEmail,
    });

const submissionToReviewEmail = transporter.templateSender(
    new EmailTemplate( './email_templates/submissionToReviewEmail'), {
        from: scoreboardAdminEmail,
    });

function sendApprovedEmail() {
    approvedEmail({
        to: "??",
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
        to: scoreboardAdminEmail,
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

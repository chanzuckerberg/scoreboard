var BaseController = require("./Base");
const db = require("../database.js");
const { check } = require("express-validator/check");

module.exports = BaseController.extend({
    name: "Approve",
    run: function(req, res, next) {
        if (!"user" in req) {
            return res.status(401).json("Must be logged in");
        }
        if (!req.user.is_admin) {
            return res.status(401).json("User does not have permission to approve or reject algorithm");
        }
        let errors = check(req);
        if (!errors.isEmpty()) {
            res.status(422).json(errors);
        }
        const submissionId = parseInt(req.body.submissionid);
        const approved = !!req.body.approved;
        if (approved) {
            db.approveAlgorithm(submissionId).then(data => {
                res.sendStatus(204);
            })
                .catch(err => {
                    console.log(`ERROR setting submission id ${submissionId} to true`, err);
                    res.status(400).json("Update failed for submission");
                });
        } else {
            db.deleteSubmission(submissionId).then(data => {
                res.sendStatus(204);
            })
                .catch(err => {
                    console.log(`ERROR setting submission id ${submissionId} to true`, err);
                    res.status(400).json("Delete failed for submission");
                });
        }
    }

});

module.exports.approveValidators = [
    check("submissionid")
        .exists()
        .isInt()
        .withMessage("Submission Id is required and must be numerical"),
    check("approved")
        .exists()
        .isBoolean()
        .withMessage("Approved must be boolean value.")];
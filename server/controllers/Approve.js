var BaseController = require("./Base");
const db = require("../database.js");
const { check } = require("express-validator/check");

module.exports = BaseController.extend({
    name: "Approve",
    run: db.approveAlgorithm
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
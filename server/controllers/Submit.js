var BaseController = require("./Base");
const db = require("../database.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { check } = require("express-validator/check");

module.exports = BaseController.extend({
    name: "Submit",
    run: db.submitResults
});


module.exports.submissionValidators = [
    upload.single("results"),
    check("submission")
        .exists()
        .isLength({ min: 1 })
        .withMessage("Submission name is required"),
    check("repo")
        .exists()
        .isURL()
        .custom(value => {
            const re = /^.*github.com\/[-a-zA-Z0-9_]+\/[-a-zA-Z0-9_]+/;
            return re.test(value);
        })
        .withMessage("Github Repo is required and must be a valid link to a github repository"),
    check("publications")
        .optional()
        .custom(value => {
            const publications = value.split(",");
            const re = /^.*[-a-zA-Z0-9_]+\.[a-zA-Z]+/;
            publications.forEach(publication => {
                if (!re.test(value)) return false;
            });
            return true;
        })
        .withMessage("Publications must be links in list form"),
    check("institution")
        .optional()
        .withMessage("There was a problem with the institution field"),
    check("private")
        .optional()
        .isBoolean()
        .withMessage("Private muse be set to true or false")
];
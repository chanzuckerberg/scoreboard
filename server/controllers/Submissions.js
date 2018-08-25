var BaseController = require("./Base");
const db = require("../database.js");

module.exports = BaseController.extend({
    name: "Submissions",
    run: db.getSubmissions
});

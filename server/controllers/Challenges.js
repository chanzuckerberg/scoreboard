var BaseController = require("./Base");
const db = require("../database.js");

module.exports = BaseController.extend({
    name: "Challenges",
    run: function(req, res, next) {
        db.getChallenges().then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Retrieved ALL challenges",
            });
        })
            .catch(function(err) {
                return next(err);
            });
    }
});
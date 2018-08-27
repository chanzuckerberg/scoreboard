var BaseController = require("./Base");
const db = require("../database.js");

module.exports = BaseController.extend({
    name: "Challenge",
    run: function(req, res, next) {
        const challengeID = parseInt(req.params.challegeid);
        db.getOneChallenge(challengeID).then(function(data) {
            // TODO what if fetch returns 0 items or > 1?
            res.status(200).json({
                status: "success",
                data: data[0],
                message: "Retrieved one challenges",
            });
        })
            .catch(function(err) {
                return next(err);
            });
    }
});
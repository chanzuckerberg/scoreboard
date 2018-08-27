var BaseController = require("./Base");
const db = require("../database.js");

module.exports = BaseController.extend({
    name: "Datasets",
    run: function(req, res, next) {
        const challengeID = parseInt(req.params.challegeid);
        db.getDatasets(challengeID).then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: `Retrieved dataset for one challenge`,
            });
        })
            .catch(function(err) {
                return next(err);
            });
    }
});
var BaseController = require("./Base");

module.exports = BaseController.extend({
    name: "Logout",
    run: function(req, res, next) {
        req.logout();
        req.session.destroy();
        return res.status(200).json({
            status: "success",
            message: "Logged out user",
        });
    }
});
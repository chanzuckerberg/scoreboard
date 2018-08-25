// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");

const app = express();
const db = require("./database.js");
const upload = multer({ dest: "uploads/" });

const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

const { check } = require("express-validator/check");
const bodyParser = require("body-parser");
const { sanitize } = require("express-validator/filter");

const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

//Controllers
const Logout = require('./controllers/Logout');
const Submit = require('./controllers/Submit');
const Approve = require('./controllers/Approve');
const Challenges = require('./controllers/Challenges');
const User = require('./controllers/User');
const Datasets = require('./controllers/Datasets');
const Submissions = require('./controllers/Submissions');
const Challenge = require('./controllers/Challenge');

// Setup logger
app.use(
	morgan(
		':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
	)
);
// Parse json post requests
app.use(bodyParser.json());
const jsonParser = bodyParser.json();

// Setup session

app.use(expressSession({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(cookieParser());

//Setup Passport
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.SCOREBOARD_GH_APPID,
			clientSecret: process.env.SCOREBOARD_GH_SECRET,
			callbackURL: "/auth/github/callback",
		},
		function(accessToken, refreshToken, profile, cb) {
			const { displayName, username } = profile;
			let email = "";
			if ("emails" in profile && profile.emails.length) email = profile.emails[0].value;
			db.gitHubUser(username, email, displayName).then(user => {
				return cb(null, user);
			});

			//
		}
	)
);

passport.serializeUser(function(user, cb) {
	// console.log("serialize", user);
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	// console.log("deserialize", obj);
	cb(null, obj);
});

// Serve static assets
app.use("/assets", express.static(path.resolve(__dirname, "..", "assets")));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));

app.get("/auth/github", passport.authenticate("github", { scope: ["user:read"] }));

app.get(
	"/auth/github/callback",
	passport.authenticate("github", { failureRedirect: "/" }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect("/");
	}
);

app.get("/api/ghuser", function(req, res) {
    if ("user" in req) {
        return res.status(200).json({
            status: "success",
            data: req.user,
            message: `Retrieved user ${req.user.id}`,
        });
    } else {
        return res.status(200).json({
            status: "fail",
            message: `Failed to retrieve user, please login`,
        });
    }
});


app.get("/auth/logout", function(req, res) {
	Logout.run(req, res);
});

app.get("/api/challenges", function(req, res) {
    Challenges.run(req, res);
});

app.get("/api/user", function(req, res) {
    User.run(req, res);
});

app.get("/api/datasets/:challegeid", function(req, res) {
    Datasets.run(req, res);
});

app.get("/api/submissions/:challegeid", function(req, res) {
    Submissions.run(req, res);
});

app.get("/api/challenge/:challegeid", function(req, res) {
    Challenge.run(req, res);
});

app.post("/api/approve", jsonParser, Approve.approveValidators, function(req, res, next) {
	Approve.run(req, res, next);
});

app.post("/api/submitresults",Submit.submissionValidators, function(req, res, next) {
	Submit.run(req, res, next);
});


// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

module.exports = app;

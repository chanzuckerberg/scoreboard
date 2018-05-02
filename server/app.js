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
			const { displayName, username, emails } = profile;
			let email = emails[0].value;
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
app.get("/auth/logout", function(req, res) {
	req.logout();
	req.session.destroy();
	return res.status(200).json({
		status: "success",
		message: "Logged out user",
	});
});

app.get("/api/challenges", db.getChallenges);
app.get("/api/user", db.getUser);
app.get("/api/ghuser", function(req, res) {
	if ("user" in req) {
		return res.status(200).json({
			status: "success",
			data: req.user,
			message: `Retrieved user ${req.user.id}`,
		});
	} else {
		return res.status(400).json({
			status: "fail",
			message: `Failed to retrieve user, please login`,
		});
	}
});
app.get("/api/datasets/:challegeid", db.getDatasets);
app.get("/api/submissions/:challegeid", db.getSubmissions);
app.get("/api/challenge/:challegeid", db.getOneChallenge);
app.post("/api/approve", jsonParser, [
	check("submissionid")
		.exists()
		.isInt()
		.withMessage("Submission Id is required and must be numerical"),
	check("approved")
		.exists()
		.isBoolean()
		.withMessage("Approved must be boolean value."),
	db.approveAlgorithm,
]);
app.post("/api/submitresults", [
	// TODO Sanitize
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
		.withMessage("Private muse be set to true or false"),
	db.submitResults,
]);

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

module.exports = app;

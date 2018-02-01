// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const app = express();
const db = require("./database.js");
const upload = multer({ dest: "uploads/" });

// Setup logger
app.use(
	morgan(
		':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
	)
);

// Serve static assets
app.use("/assets", express.static(path.resolve(__dirname, "..", "assets")));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));

app.get("/api/challenges", db.getChallenges);
app.get("/api/datasets/:challegeid", db.getDatasets);
app.get("/api/submissions/:challegeid", db.getSubmissions);
app.get("/api/challenge/:challegeid", db.getOneChallenges);
app.post("/api/submitresults", upload.single('results'), db.submitResults);

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

module.exports = app;

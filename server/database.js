const pgp = require("pg-promise")();
const { exec } = require("child_process");
const connection = {
	host: "localhost",
	port: 5432,
	database: "scoreboard",
	user: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
};
const db = pgp(connection);
const { validationResult } = require("express-validator/check");

function getChallenges(req, res, next) {
	db
		.any(
			"select c.id, c.name, c.description, c.image_path, c.start_date, count(distinct(d.id)) as datasets, count(distinct(s.id)) as submissions " +
				"from challenges c " +
				"left join datasets d on (d.challenge_id = c.id) " +
				"left join submissions s on (s.challenge_id = c.id) " +
				"where c.is_open = True " +
				"group by c.id " +
				"order by c.id"
		)
		.then(function(data) {
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

function getOneChallenges(req, res, next) {
	const challengeID = parseInt(req.params.challegeid);
	db
		.any(
			"select c.id, c.name, c.description, c.image_path, c.start_date " +
				"from challenges c " +
				"where c.id = $1 ",
			challengeID
		)
		.then(function(data) {
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

function getDatasets(req, res, next) {
	const challengeID = parseInt(req.params.challegeid);
	db
		.any("select * from datasets where challenge_id = $1", challengeID)
		.then(function(data) {
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

function getSubmissions(req, res, next) {
	const challengeID = parseInt(req.params.challegeid);
	db
		.any(
			"select u.name as user_name, s.*, r.results_path, r.score_data, r.submission_date from submissions s join users u on u.id = s.user_id join results r on s.id = r.submission_id where s.challenge_id = $1 and r.is_current = True",
			challengeID
		)
		.then(function(data) {
			res.status(200).json({
				status: "success",
				data: data,
				message: "Retrieved submissions for one challenge",
			});
		})
		.catch(function(err) {
			return next(err);
		});
}

function submitResults(req, res, next) {
	// Verify form
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.mapped() });
	}

	// Score with docker
	exec(
		// TODO scale with AWS Batch or ECS
		`docker run --rm -v /Users/charlotteweaver/Documents/Git/scoreboard/${req.file
			.path}:/app/resultsfile.txt chanzuckerberg/scoreboard`,
		(err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				console.log("Error", err);
				res.status(422).json({
					errors: err,
				});
			} else {
				// the *entire* stdout and stderr (buffered)
				const results = JSON.parse(stdout);
				console.log(results["error"]);
				if (results["error"] !== "") {
					res.status(422).json({
						errors: { file: { msg: results["error"] } },
					});
				} else {
					//TODO handle error
					_loadScore(req.body, { data: results["score"] }, req.file.path).then(() => {
						res.status(200).json({
							status: "success",
							message: "hip hip hooray",
						});
					});
				}
			}
		}
	);
	return true;
}
function _loadScore(form, data, filepath) {
	// create or get submission
	return new Promise(resolve => {
		db.tx(t => {
			return (
				t
					.oneOrNone(
						"select id from submissions where user_id = $1 and challenge_id = $2 and name= $3",
						[form.userid, form.challengeid, form.submission]
					)
					.then(submissionid => {
						if (!submissionid) {
							// if submission doesn't exist, insert it
							const is_private = form.private === "true";
							return t
								.one(
									"insert into submissions(user_id, challenge_id, name, repository, is_private, institution, publication, is_accepted) " +
										"values ($1, $2, $3, $4, $5, $6, $7, false) RETURNING id",
									[
										form.userid,
										form.challengeid,
										form.submission,
										form.repo,
										is_private,
										form.institution,
										form.publications,
									]
								)
								.then(data => {
									return data.id;
								});
						} else {
							// TODO or should I update it?
							return submissionid.id;
						}
					})
					// insert new submission if not exists
					.then(submissionid => {
						// insert score
						return t
							.one(
								"insert into results(submission_id, results_path, score_data, is_current, submission_date)" +
									"values ($1, $2, $3, true, $4) RETURNING id",
								[submissionid, filepath, data, new Date()]
							)
							.then(data => {
								return { results_id: data.id, submission_id: submissionid };
							});
					})
					// flip is_current switch to false on older results files for same algorithm
					.then(dbids => {
						return t.manyOrNone(
							"update results set is_current=false where submission_id = $1 and id != $2",
							[dbids.submission_id, dbids.results_id]
						);
					})
					.then(() => {
						resolve();
					})
			);
		});
	});
}

module.exports = {
	getChallenges,
	getDatasets,
	getSubmissions,
	getOneChallenges,
	submitResults,
};

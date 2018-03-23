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
			"select c.id, c.name, c.start_date, c.end_date, count(distinct(s.id)) as submissions " +
				"from challenges c " +
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
			"select c.id, c.name, c.start_date, c.end_date " +
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

function approveAlgorithm(req, res, next) {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json(errors);
	}
	const submissionId = parseInt(req.body.submissionid);
	const approved = !!req.body.approved;
	if (approved) {
		db
			.one("update submissions set is_accepted=true where id=$1 RETURNING id", submissionId)
			.then(data => {
				res.sendStatus(204);
			})
			.catch(err => {
				console.log(`ERROR setting submission id ${submissionId} to true`, err);
				res.status(400).json("Update failed for submission");
			});
	} else {
		db
			.one("delete from submissions where id=$1 RETURNING id", submissionId)
			.then(data => {
				res.sendStatus(204);
			})
			.catch(err => {
				console.log(`ERROR setting submission id ${submissionId} to true`, err);
				res.status(400).json("Delete failed for submission");
			});
	}
}

function submitResults(req, res, next) {
	// Verify form
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		let errorsToReturn = { _error: "Submit validation failed." };
		errors = errors.mapped();
		Object.keys(errors).forEach(function(key) {
			console.log(errors[key]);
			errorsToReturn[key] = errors[key].msg;
		});
		return res.status(422).json(errorsToReturn);
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
					_error: err,
				});
			} else {
				// the *entire* stdout and stderr (buffered)
				const results = JSON.parse(stdout);
				if (results["error"] !== "") {
					res
						.status(422)
						.json({ results: results["error"], _error: "Submit validation failed." });
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
	return res.status(200);
}

function getUser(req, res, next) {
	const query = req.query;
	db
		.oneOrNone(
			"select u.id, u.github_username, u.email, u.is_admin from users u where u.github_username =  $1 and u.email = $2",
			[query.id, query.email]
		)
		.then(userId => {
			if (!userId) {
				db.tx(t => {
					return t
						.one(
							"insert into users(github_username, name, email, is_admin) " +
								"values ($1, $2, $3, false) RETURNING id, github_username, email, is_admin",
							[query.id, query.name, query.email]
						)
						.then(data => {
							res.status(200).json({
								status: "success",
								data: data,
								message: `Added new user ${query.id}`,
							});
						});
				});
			} else {
				res.status(200).json({
					status: "success",
					data: userId,
					message: `Retrieved user ${query.id}`,
				});
			}
		});
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
	getUser,
	getSubmissions,
	getOneChallenges,
	submitResults,
	approveAlgorithm,
};

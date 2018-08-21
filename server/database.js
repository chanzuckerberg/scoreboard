const path = require("path");
const { exec } = require("child_process");
const { validationResult } = require("express-validator/check");
const pgp = require("pg-promise")();
const emailer = require("./emails.js");

const connection = {
	host: process.env.SCOREBOARD_PG_HOST || "localhost",
	port: process.env.SCOREBOARD_PG_PORT || 5432,
	database: process.env.SCOREBOARD_PG_DATABASE || "scoreboard",
	user: process.env.SCOREBOARD_PG_USERNAME,
	password: process.env.SCOREBOARD_PG_PASSWORD,
};
const db = pgp(connection);

function getChallenges(req, res, next) {
	db
		.any(
			"select c.id, c.name, c.description, c.image, c.color, c.start_date, count(distinct(d.id)) as datasets, count(distinct(s.id)) as submissions " +
				"from challenges c " +
				"left join datasets d on (d.challenge_id = c.id) " +
				"left join submissions s on (s.challenge_id = c.id and s.is_accepted = True and s.is_private = False)" +
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

function getOneChallenge(req, res, next) {
	const challengeID = parseInt(req.params.challegeid);
	db
		.any("select c.* " + "from challenges c " + "where c.id = $1 ", challengeID)
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
			"select coalesce(u.name, u.github_username) as user_name, u.github_username, s.*, r.results_path, r.score_data, r.submission_date from submissions s join users u on u.id = s.user_id join results r on s.id = r.submission_id where s.challenge_id = $1 and r.is_current = True",
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
	// Error if no user logged in or user not an admin
	if (!"user" in req) {
		return res.status(401).json("Must be logged in");
	}
	if (!req.user.is_admin) {
		return res.status(401).json("User does not have permission to approve or reject algorithm");
	}
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
	db
		.one("select docker_container from challenges where id = $1", req.body.challengeid)
		.then(data => {
			const filesavepath = path.join(path.dirname(__dirname), req.file.path);
			console.log(
				"exec command",
				`docker run --rm -v ${filesavepath}:/app/resultsfile.txt ${data.docker_container}`
			);
			exec(
				// TODO scale with AWS Batch or ECS
				`docker run --rm -v ${filesavepath}:/app/resultsfile.txt ${data.docker_container}`,
				(err, stdout, stderr) => {
					if (err) {
						// node couldn't execute the command
						console.log("Error", err);
						res.status(422).json({
							_error: "Scoring failed. Please contact an administrator",
							results: "Docker failed to run",
						});
					} else {
						// the *entire* stdout and stderr (buffered)
						const results = JSON.parse(stdout);
						if (results["error"] !== "") {
							res.status(422).json({
								results: results["error"],
								_error: "Submit validation failed.",
							});
						} else {
							let score = { data: results.score };
							if ("additionalData" in results) score.additionalData = results.additionalData;
							_loadScore(req.body, score, req.file.path).then(() => {
								res.status(200).json({
									status: "success",
									message: "hip hip hooray",
								});
							});
						}
					}
				}
			);
		});
	emailer.sendEmail();
	return res.status(200);
}

function getUser(req, res, next) {
	const query = req.query;
	db
		.oneOrNone(
			"select u.id, u.github_username, u.email, u.is_admin from users u where u.github_username=$1",
			[query.id]
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
			} else if (!userId.email) {
				db.tx(t => {
					return t
						.one(
							"update users set name = $1, email=$2 where github_username=$3" +
								"RETURNING id, github_username, email, is_admin",
							[query.name, query.email, query.id]
						)
						.then(data => {
							res.status(200).json({
								status: "success",
								data: data,
								message: `Updated user ${query.id}`,
							});
						});
				});
			} else {
				return res.status(200).json({
					status: "success",
					data: userId,
					message: `Retrieved user ${query.id}`,
				});
			}
		})
		.catch(err => {
			console.log(`ERROR gettin user`, err);
			res.status(400).json("Failed to add user");
		});
}

function gitHubUser(username, email, displayName) {
	return db
		.oneOrNone(
			"select u.id, u.github_username, u.email, u.is_admin from users u where u.github_username=$1",
			[username]
		)
		.then(user => {
			if (!user) {
				db.tx(t => {
					return t
						.one(
							"insert into users(github_username, name, email, is_admin) " +
								"values ($1, $2, $3, false) RETURNING id, github_username, email, is_admin",
							[username, displayName, email]
						)
						.then(data => {
							return data;
						})
						.catch(err => {
							console.log(`ERROR getting user`, err);
							return null;
						});
				});
			} else if (!user.email && email) {
				db.tx(t => {
					return t
						.one(
							"update users set name = $1, email=$2 where github_username=$3" +
								"RETURNING id, github_username, email, is_admin",
							[displayName, email, username]
						)
						.then(data => {
							return data;
						})
						.catch(err => {
							console.log(`ERROR getting user`, err);
							return null;
						});
				});
			} else {
				return user;
			}
		})
		.catch(err => {
			console.log(`ERROR getting user`, err);
			return null;
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
							// TODO or should I update it
							const is_private = form.private === "true";
							return t
								.one(
									"update submissions set  repository = $1, is_private = $2, institution = $3, publication = $4 where id = $5 RETURNING id",
									[form.repo, is_private, form.institution, form.publications, submissionid.id]
								)
								.then(data => {
									return data.id;
								})
								.catch(err => {
									console.log(`ERROR `, err);
									res.status(400).json("Oppse");
								});
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
	getUser,
	getSubmissions,
	getOneChallenge,
	submitResults,
	approveAlgorithm,
	gitHubUser,
};

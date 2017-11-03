const pgp = require('pg-promise')()
const connection = {
	host: 'localhost',
	port: 5432,
	database: 'scoreboard',
	user: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
}
const db = pgp(connection)

function getChallenges(req, res, next) {
	db.any(
		'select c.id, c.name, c.description, c.image_path, c.start_date, count(distinct(d.id)) as datasets, count(distinct(s.id)) as submissions ' +
		'from challenges c ' +
		'left join datasets d on (d.challenge_id = c.id) ' +
		'left join submissions s on (s.challenge_id = c.id) ' +
		'where c.is_open = True ' +
		'group by c.id ' +
		'order by c.id'
	)
	.then(function (data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: 'Retrieved ALL challenges'
		})
	})
	.catch(function (err) {
		return next(err)
	})
}

function getDatasets(req, res, next) {
	const challengeID = parseInt(req.params.id)
	db.any("select * from datasets where challenge_id = $1", challengeID)
	.then(function (data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: `Retrieved dataset for one challenge`
		})
	})
	.catch(function (err) {
		return next(err)
	})
}

function getSubmissions(req, res, next) {
	const challengeID = parseInt(req.params.id)
	db.any("select u.name as user_name, s.*  " +
		"from submissions s " +
		"join users u on u.id = s.user_id " +
		"where s.challenge_id = $1", challengeID)
	.then(function (data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: "Retrieved submissions for one challenge"
		})
	})
	.catch(function (err) {
		return next(err)
	})
}

module.exports = {
	getChallenges,
	getDatasets,
	getSubmissions,
}
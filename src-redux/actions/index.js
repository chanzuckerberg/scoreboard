export const REQUEST_CHALLENGES = "REQUEST_CHALLENGES";
export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const REQUEST_SUBMISSIONS = "REQUEST_SUBMISSIONS";
export const RECEIVE_SUBMISSIONS = "RECEIVE_SUBMISSIONS";
export const REQUEST_DATASETS = "REQUEST_DATASETS";
export const RECEIVE_DATASETS = "RECEIVE_DATASETS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const base_url = "http://localhost:9000"
const challenges_url = `${base_url}/api/challenges`
const submissions_url = `${base_url}/api/submissions`
const dataset_url = `${base_url}/api/datasets`


// Get all challenges for homepage
const requestChallenges = () => ({
  type: REQUEST_CHALLENGES,
})

const receiveChallenges = (json) => ({
  type: RECEIVE_CHALLENGES,
  challenges: json.data,
  receivedAt: Date.now()
})

export const fetchChallenges = () => {
	return dispatch => {
		dispatch(requestChallenges())
		return fetch(challenges_url)
			.then(response => response.json())
			.then(json => {
				dispatch(receiveChallenges(json))
			})

	}
}


// Login and logout for admin roles
// TODO this is a temp hack, actually log in using github
export const login = (name, role) => {
	console.log("LOGIN", name, role)
	return {
		name,
		role,
		type: LOGIN,
	}
}

export const logout = () => ({
	type: LOGOUT,
})


const requestSubmissions = () => ({
  type: REQUEST_SUBMISSIONS,
})

const receiveSubmissions = (json) => ({
  type: RECEIVE_SUBMISSIONS,
  submissions: json.data,
  receivedAt: Date.now()
})

export const fetchSubmissions = (challenge_id) => {
	return dispatch => {
		dispatch(requestSubmissions())
		return fetch(`${submissions_url}/${challenge_id}`)
			.then(response => response.json())
			.then(json => {
				console.log('JSON:', json)
				dispatch(receiveSubmissions(json))
			})

	}
}

const requestDatasets = () => ({
  type: REQUEST_DATASETS,
})

const receiveDatasets = (json) => ({
  type: RECEIVE_DATASETS,
  datasets: json.data,
  receivedAt: Date.now()
})

export const fetchDatasets = (challenge_id) => {
	return dispatch => {
		dispatch(requestDatasets())
		return fetch(`${dataset_url}/${challenge_id}`)
			.then(response => response.json())
			.then(json => {
				console.log('JSON:', json)
				dispatch(receiveDatasets(json))
			})

	}
}

export const fetchOneChallenge = (challenge_id) => {
  return dispatch => Promise.all([
    dispatch(fetchSubmissions(challenge_id)),
    dispatch(fetchDatasets(challenge_id))
  ]);
}



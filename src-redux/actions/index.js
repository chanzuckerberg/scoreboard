export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const RECEIVE_CHALLENGE = "RECEIVE_CHALLENGE";
export const RECEIVE_SUBMISSIONS = "RECEIVE_SUBMISSIONS";
export const RECEIVE_DATASETS = "RECEIVE_DATASETS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SORT_ALGORTIHMS = "SORT_ALGORTIHMS";
export const TOGGLE_ALOGRITHM_ACTIVATION = "TOGGLE_ALOGRITHM_ACTIVATION";

const base_url = "http://localhost:9000";
const challenges_url = `${base_url}/api/challenges`;
const challenge_url = `${base_url}/api/challenge`;
const submissions_url = `${base_url}/api/submissions`;
const dataset_url = `${base_url}/api/datasets`;

// Get all challenges for homepage

const receiveChallenges = json => ({
	type: RECEIVE_CHALLENGES,
	challenges: json.data,
	receivedAt: Date.now(),
});

export const fetchChallenges = () => {
	return dispatch => {
		return fetch(challenges_url)
			.then(response => response.json())
			.then(json => {
				dispatch(receiveChallenges(json));
			});
	};
};

// Login and logout for admin roles
// TODO this is a temp hack, actually log in using github
export const login = (name, role) => {
	console.log("LOGIN", name, role);
	return {
		name,
		role,
		type: LOGIN,
	};
};

export const logout = () => ({
	type: LOGOUT,
});

const receiveSubmissions = json => ({
	type: RECEIVE_SUBMISSIONS,
	submissions: json.data,
	receivedAt: Date.now(),
});

export const fetchSubmissions = challenge_id => {
	return dispatch => {
		return fetch(`${submissions_url}/${challenge_id}`)
			.then(response => response.json())
			.then(json => {
				dispatch(receiveSubmissions(json));
			});
	};
};

const receiveDatasets = json => ({
	type: RECEIVE_DATASETS,
	datasets: json.data,
	receivedAt: Date.now(),
});

export const fetchDatasets = challenge_id => {
	return dispatch => {
		return fetch(`${dataset_url}/${challenge_id}`)
			.then(response => response.json())
			.then(json => {
				dispatch(receiveDatasets(json));
			});
	};
};

const receiveChallengeInfo = json => ({
	type: RECEIVE_CHALLENGE,
	challenge: json.data,
	receivedAt: Date.now(),
});

export const fetchChallengeInfo = challenge_id => {
	return dispatch => {
		return fetch(`${challenge_url}/${challenge_id}`)
			.then(response => response.json())
			.then(json => {
				dispatch(receiveChallengeInfo(json));
			});
	};
};

export const fetchOneChallenge = challenge_id => {
	return dispatch => {
		return Promise.all([
			dispatch(fetchSubmissions(challenge_id)),
			dispatch(fetchDatasets(challenge_id)),
			dispatch(fetchChallengeInfo(challenge_id)),
		]);
	};
};

export const sortAlgorithms = (attr, idx) => {
	return {
		type: SORT_ALGORTIHMS,
		sortBy: attr,
		dataIdx: idx,
	};
};

export const toggleAlgortirhmActivation = algorithmID => {
	return {
		type: TOGGLE_ALOGRITHM_ACTIVATION,
		algorithmID: algorithmID,
	};
};

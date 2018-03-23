export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const RECEIVE_CHALLENGE = "RECEIVE_CHALLENGE";
export const RECEIVE_SUBMISSIONS = "RECEIVE_SUBMISSIONS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SORT_ALGORTIHMS = "SORT_ALGORTIHMS";
export const TOGGLE_ALOGRITHM_ACTIVATION = "TOGGLE_ALOGRITHM_ACTIVATION";
export const ADMIN_APPROVE_ALOGRITHM = "ADMIN_APPROVE_ALOGRITHM";
export const RECIEVE_USER = "RECIEVE_USER";
export const NODE = "NODE";

const base_url = "http://localhost:9000";
const challenges_url = `${base_url}/api/challenges`;
const challenge_url = `${base_url}/api/challenge`;
const submissions_url = `${base_url}/api/submissions`;
const user_url = `${base_url}/api/user`;
const approve_url = `${base_url}/api/approve`;

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

export const login = profile => {
	// add user if none exists
	return dispatch => {
		return fetch(`${user_url}?id=${profile.id}&name=${profile.name}&email=${profile.email}`)
			.then(response => response.json())
			.then(json => {
				dispatch(recieveUser(json));
			});
	};
};

const recieveUser = user => ({
	type: RECIEVE_USER,
	receivedAt: Date.now(),
	user,
});

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

const receiveChallengeInfo = json => ({
	type: RECEIVE_CHALLENGE,
	challenge: json.data,
	receivedAt: Date.now(),
});

export const node = _the_node => ({
	type: NODE,
	node: _the_node,
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

export const approveOrRejectSubmission = (submissionid, approved, challengeid) => {
	return dispatch => {
		const approvedBool = approved === "true";
		fetch(approve_url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ submissionid, approved: approvedBool }),
		})
			.then(response => {
				console.log(response);
				console.log(challengeid);
				dispatch(fetchOneChallenge(challengeid));
			})
			.catch(err => {
				// TODO have an actual error behavior here

				console.log("Error", err);
			});
	};
};

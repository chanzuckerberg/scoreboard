export const REQUEST_CHALLENGES = "REQUEST_CHALLENGES";
export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const base_url = "http://localhost:9000"
const challenges_url = base_url + "/api/challenges"

export const requestPosts = () => ({
  type: REQUEST_CHALLENGES,
})

export const receivePosts = (json) => ({
  type: RECEIVE_CHALLENGES,
  challenges: json.data,
  receivedAt: Date.now()
})

export const fetchChallenges = () => {
	return dispatch => {
		dispatch(requestPosts())
		return fetch(challenges_url)
			.then(response => response.json())
			.then(json => {
				console.log('JSON:', json)
				dispatch(receivePosts(json))
			})

	}
}

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


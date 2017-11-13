import { REQUEST_CHALLENGES, RECEIVE_CHALLENGES, LOGIN, LOGOUT, REQUEST_SUBMISSIONS, RECEIVE_SUBMISSIONS } from "../actions";

export const challengeData = (state = {isFetching: false, challenges: []}, action) => {
	if (action.type === REQUEST_CHALLENGES) {
		return {
			...state,
			isFetching: true,
		}
	} else if (action.type === RECEIVE_CHALLENGES) {
		return {
			...state,
			isFetching: false,
			challenges: action.challenges,
		}
	} else {return state}
}

export const user = (state = {name: "", isAdmin: false }, action) => {
	 if (action.type === LOGIN) {
		return {
			...state,
			name: action.name,
			isAdmin: (action.role),
		}
	} else if (action.type === LOGOUT) {
		return {
			...state,
			name: "",
			isAdmin: false,
		}
	} else {return state}
}

export const submissionData =  (state = {isFetching: false, submissions: []}, action) => {
	if (action.type === REQUEST_SUBMISSIONS) {
		return {
			...state,
			isFetching: true,
		}
	} else if (action.type === RECEIVE_SUBMISSIONS) {
		return {
			...state,
			isFetching: false,
			submissions: action.submissions,
		}
	} else {return state}
}

// TODO, why can't I combine reducers here?





import { RECEIVE_CHALLENGES, LOGIN, LOGOUT, RECEIVE_SUBMISSIONS, RECEIVE_DATASETS, RECEIVE_CHALLENGE } from "../actions";

export const challengeData = (state = {challenges: []}, action) => {
if (action.type === RECEIVE_CHALLENGES) {
		return {
			...state,
			isFetching: false,
			challenges: action.challenges,
		}
	} else {return state}
}
export const selectedChallege = (state = {challenge: {}}, action) => {
if (action.type === RECEIVE_CHALLENGE) {
		return {
			...state,
			isFetching: false,
			challenge: action.challenge,
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

export const submissionData =  (state = {submissions: []}, action) => {
	if (action.type === RECEIVE_SUBMISSIONS) {
		return {
			...state,
			isFetching: false,
			submissions: action.submissions,
		}
	} else {return state}
}

export const datasetData =  (state = {datasets: []}, action) => {
if (action.type === RECEIVE_DATASETS) {
		return {
			...state,
			isFetching: false,
			datasets: action.datasets,
		}
	} else {return state}
}

// TODO, why can't I combine reducers here?





import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import {
	RECEIVE_CHALLENGES,
	RECIEVE_USER,
	LOGOUT,
	RECEIVE_SUBMISSIONS,
	RECEIVE_DATASETS,
	RECEIVE_CHALLENGE,
	SORT_ALGORTIHMS,
	NODE,
	TOGGLE_ALOGRITHM_ACTIVATION,
} from "../actions";

const challengeData = (state = { challenges: [] }, action) => {
	if (action.type === RECEIVE_CHALLENGES) {
		return {
			...state,
			isFetching: false,
			challenges: action.challenges,
		};
	} else {
		return state;
	}
};
const selectedChallege = (state = { challenge: {} }, action) => {
	if (action.type === RECEIVE_CHALLENGE) {
		return {
			...state,
			isFetching: false,
			challenge: action.challenge,
		};
	} else {
		return state;
	}
};

const user = (
	state = { name: "", isAdmin: false, email: "", full_name: "", userId: -1 },
	action
) => {
	if (action.type === RECIEVE_USER) {
		return {
			...state,
			name: action.user.data.github_username,
			isAdmin: action.user.data.is_admin,
			email: action.user.data.email,
			full_name: action.user.data.name,
			userId: action.user.data.id,
		};
	} else if (action.type === LOGOUT) {
		return {
			...state,
			name: "",
			email: "",
			full_name: "",
			isAdmin: false,
			userId: -1,
		};
	} else {
		return state;
	}
};

const node = (state = { node: false }, action) => {
	if (action.type === NODE) {
		console.log(node);
		return {
			...state,
			node: action.node,
		};
	} else {
		return state;
	}
};

const submissionData = (state = { submissions: [], sortBy: "Name", dataIdx: 0 }, action) => {
	if (action.type === RECEIVE_SUBMISSIONS) {
		let submissions = action.submissions.map(item => {
			item.active = false;
			return item;
		});
		return {
			...state,
			isFetching: false,
			submissions: submissions,
		};
	} else if (action.type === SORT_ALGORTIHMS) {
		return {
			...state,
			sortBy: action.sortBy,
			dataIdx: action.dataIdx,
		};
	} else if (action.type === TOGGLE_ALOGRITHM_ACTIVATION) {
		let submissions = state.submissions.map(item => {
			if (item.id === action.algorithmID) item.active = !item.active;
			return item;
		});
		return {
			...state,
			submissions: submissions,
		};
	} else {
		return state;
	}
};

const datasetData = (state = { datasets: [] }, action) => {
	if (action.type === RECEIVE_DATASETS) {
		return {
			...state,
			isFetching: false,
			datasets: action.datasets,
		};
	} else {
		return state;
	}
};

export const rootReducer = combineReducers({
	challengeData,
	user,
	submissionData,
	selectedChallege,
	datasetData,
	router: routerReducer,
	form: formReducer,
});

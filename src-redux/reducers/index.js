import {
	RECEIVE_CHALLENGES,
	LOGIN,
	LOGOUT,
	RECEIVE_SUBMISSIONS,
	RECEIVE_DATASETS,
	RECEIVE_CHALLENGE,
	SORT_ALGORTIHMS,
	TOGGLE_ALOGRITHM_ACTIVATION,
} from "../actions";

export const challengeData = (state = { challenges: [] }, action) => {
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
export const selectedChallege = (state = { challenge: {} }, action) => {
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

export const user = (state = { name: "", isAdmin: false }, action) => {
	if (action.type === LOGIN) {
		return {
			...state,
			name: action.name,
			isAdmin: action.role,
		};
	} else if (action.type === LOGOUT) {
		return {
			...state,
			name: "",
			isAdmin: false,
		};
	} else {
		return state;
	}
};

export const submissionData = (state = { submissions: [], sortBy: "Name", dataIdx: 0 }, action) => {
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

export const datasetData = (state = { datasets: [] }, action) => {
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

// TODO, why can't I combine reducers here?

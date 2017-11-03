import { combineReducers } from "redux";

import { REQUEST_CHALLENGES, RECEIVE_CHALLENGES, LOGIN, LOGOUT } from "../actions";



const challengeData = (state = {isFetching: false, challenges: []}, action) => {
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

const user = (state = {name: "", isAdmin: false }, action) => {
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




const rootReducer = combineReducers({
	challengeData,
	user
});

export default rootReducer;

import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { challengeData, submissionData, user, datasetData, selectedChallege } from "./reducers";
import { Challenge, Home } from "./containers/App.jsx";

import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";

import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		challengeData,
		user,
		submissionData,
		selectedChallege,
		datasetData,
		router: routerReducer,
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk, middleware)
);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/challenge/:id" component={Challenge} />
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("app")
);

import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { Challenge, Home, Login } from "./containers/App.jsx";

import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";

import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk, middleware)
);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/challenge/:id" component={Challenge} />
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("app")
);

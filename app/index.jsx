import React, { Component } from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import {Header} from "./components/Header.jsx"
import { HomeTabs, ChallengeTabs} from "./components/Tabs.jsx"
import {Footer} from "./components/Footer.jsx"

class Home extends Component {
	render() {
		return (
			<div>
				<div className="container content">
					<Header title="analysis scoreboard" subtitle="Human Cell Atlas"/>
					<hr/>
					<HomeTabs active="about"/>
				</div>
				<Footer/>
			</div>
		)
	}
}

class Challenge extends Component {
	render() {
		return (
			<div>
				<div className="container content">
					<Header title="analysis scoreboard" subtitle="Human Cell Atlas"/>
					<hr/>
					<ChallengeTabs active="about"/>
				</div>
				<Footer/>
			</div>
		)
	}
}
const App = (Props) => {
	return (
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route exact path="/challenge/:id" component={Challenge}/>
		</Switch>
	)
}

render(
    <BrowserRouter>
		<App />
    </BrowserRouter>,
    document.getElementById('app')
)

import React, { Component } from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import {Header} from "./components/Header.jsx"
import { HomeTabs, ChallengeTabs} from "./components/Tabs.jsx"
import {Footer} from "./components/Footer.jsx"

import {unslugify} from './utils/utils'

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
		// const challenge = unslugify(this.props.match.params.id)
		const challenge = "fake challenge"
		return (
			<div>
				<div className="container content">
					<Header title="analysis scoreboard" subtitle={challenge}/>
					<hr/>
					<ChallengeTabs active="about"/>
				</div>
				<Footer/>
			</div>
		)
	}
}
const App = (props) => {
	return (
		<Switch>
			{/*<Route exact path="/" component={Home}/>*/}
			<Route exact path="/" component={Challenge}/>
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

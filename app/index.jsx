import React, { Component } from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import {Header} from "./components/Header.jsx"
import { HomeTabs, ChallengeTabs} from "./components/Tabs.jsx"
import {Footer} from "./components/Footer.jsx"
import {unslugify} from "./utils/utils";


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role: "admin",
		};
	}

	login(e) {
		const role = e.target.getAttribute("data-role");
		this.setState({role: role})
	}
	
	render() {
		return (
			<div>
				<div className="container content">
					<Header title="analysis scoreboard" login={this.login.bind(this)} role={this.state.role} subtitle="Human Cell Atlas"/>
					<hr/>
					<HomeTabs active="about"/>
				</div>
				<Footer/>
			</div>
		)
	}
}

class Challenge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role: "admin",
		};
	}

	login(e)  {
		const role = e.target.getAttribute("data-role");
		this.setState({role: role})
	}

	render() {
		const challenge = unslugify(this.props.match.params.id)
		// const challenge = "fake challenge"
		return (
			<div>
				<div className="container content">
					<Header title="analysis scoreboard" login={this.login.bind(this)} role={this.state.role} subtitle={challenge}/>
					<hr/>
					<ChallengeTabs role={this.state.role} active="about"/>
				</div>
				<Footer/>
			</div>
		)
	}
}

const App = (props) => {
	return (
		<Switch>
			<Route exact path="/" component={Home}/>
			{/*<Route exact path="/" component={Challenge}/>*/}
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "./HeaderContainer.jsx";
import { About, Challenges, FAQ } from "../components/HomePage.jsx";
import { fetchChallenges, login, logout, fetchOneChallenge } from "../actions/index";
import { Footer } from "../components/Footer.jsx";
import { ChallengeTabs } from "./Challenge.jsx";
import { config } from "../scoreboard.cfg.js";

@connect(state => {
	return {
		user: state.user,
		challenges: state.challengeData.challenges,
	};
})
export class Home extends Component {
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(fetchChallenges());
	}

	login(e) {
		const { dispatch } = this.props;
		const role = e.target.getAttribute("data-role");
		if (role === "admin") dispatch(login(role, true, 4));
		else if (role === "user") dispatch(login(role, false, 1));
		else dispatch(logout());
	}

	render() {
		return (
			<div>
				<div className="container content">
					<Header
						title={config.general.title}
						login={this.login.bind(this)}
						isAdmin={this.props.user.isAdmin}
						username={this.props.user.name}
						subtitle={config.general.subtitle}
						redirect={this.props.location.pathname}
					/>
					<div>
						<div className="row">
							<About />
						</div>
						<div className="row">
							<Challenges challenges={this.props.challenges} />
						</div>
						<div className="row">
							<FAQ />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

@connect(state => {
	return {
		user: state.user,
		challenges: state.challengeData.challenges,
		submissions: state.submissionData.submissions,
		datasets: state.datasetData.datasets,
	};
})
export class Challenge extends Component {
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(fetchOneChallenge(this.props.match.params.id));
	}

	render() {
		let challenge = "";
		if (this.props.selectedChallege) challenge = this.props.selectedChallege.name;
		return (
			<div>
				<div className="container content">
					<Header
						title="scoreboard"
						isAdmin={this.props.user.isAdmin}
						username={this.props.user.name}
						subtitle={challenge}
						redirect={this.props.location.pathname}
					/>
					<ChallengeTabs
						isAdmin={this.props.user.isAdmin}
						userId={this.props.user.id}
						username={this.props.user.name}
						active="about"
						submissions={this.props.submissions}
						datasets={this.props.datasets}
					/>
				</div>
				<Footer />
			</div>
		);
	}
}

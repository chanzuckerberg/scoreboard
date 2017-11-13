import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "./HeaderContainer.jsx";
import { HomeTabs } from "./Home.jsx";
import { fetchChallenges, login, logout } from "../actions/index";
import { Footer } from "../components/Footer.jsx";
import { ChallengeTabs } from "./Challenge.jsx";

class HomeApp extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchChallenges());
	}

	login(e) {
		const { dispatch } = this.props;
		const role = e.target.getAttribute("data-role");
		console.log(role);
		if (role === "admin") dispatch(login(role, true));
		else if (role === "user") dispatch(login(role, false));
		else dispatch(logout());
	}

	render() {
		return (
			<div>
				<div className="container content">
					<Header
						title="analysis scoreboard"
						login={this.login.bind(this)}
						isAdmin={this.props.isAdmin}
						username={this.props.userName}
						subtitle="Human Cell Atlas"
					/>
					<hr />
					<HomeTabs challenges={this.props.challenges} active="about" />
				</div>
				<Footer />
			</div>
		);
	}
}

class ChallengeApp extends Component {
	componentDidMount() {
		// const { dispatch } = this.props;
		// dispatch(fetchChallenges());
	}
	login(e) {
		const { dispatch } = this.props;
		const role = e.target.getAttribute("data-role");
		console.log(role);
		if (role === "admin") dispatch(login(role, true));
		else if (role === "user") dispatch(login(role, false));
		else dispatch(logout());
	}

	render() {
		const challenge = "Fake Challenge";
		return (
			<div>
				<div className="container content">
					<Header
						title="analysis scoreboard"
						login={this.login.bind(this)}
						isAdmin={this.props.isAdmin}
						username={this.props.userName}
						subtitle={challenge}
					/>
					<hr />
					<ChallengeTabs
						isAdmin={this.props.isAdmin}
						username={this.props.userName}
						active="about"
					/>
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	const { user, challengeData } = state;
	return {
		challenges: challengeData.challenges,
		isFetching: challengeData.isFetching,
		userName: user.name,
		isAdmin: user.isAdmin,
	};
};

export const Home = connect(mapStateToProps)(HomeApp);
export const Challenge = connect(mapStateToProps)(ChallengeApp);

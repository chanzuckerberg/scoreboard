import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "./HeaderContainer.jsx";
import { About, Challenges, FAQ } from "../components/HomePage.jsx";
import { fetchChallenges, login, logout, fetchOneChallenge } from "../actions/index";
import { Footer } from "../components/Footer.jsx";
import { ChallengeTabs } from "./Challenge.jsx";
import { config } from "../scoreboard.cfg.js";
import SocialButton from "../components/SocialButton.jsx";

class HomeApp extends Component {
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
						isAdmin={this.props.isAdmin}
						username={this.props.userName}
						subtitle={config.general.subtitle}
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

class ChallengeApp extends Component {
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(fetchOneChallenge(this.props.match.params.id));
	}

	login(e) {
		const { dispatch } = this.props;
		const role = e.target.getAttribute("data-role");
		if (role === "admin") dispatch(login(role, true, 4));
		else if (role === "user") dispatch(login(role, false, 1));
		else dispatch(logout());
	}

	render() {
		let challenge = "";
		console.log(this.props);
		if (this.props.selectedChallege) challenge = this.props.selectedChallege.name;
		return (
			<div>
				<div className="container content">
					<Header
						title="scoreboard"
						login={this.login.bind(this)}
						isAdmin={this.props.isAdmin}
						username={this.props.userName}
						subtitle={challenge}
					/>
					<ChallengeTabs
						isAdmin={this.props.isAdmin}
						userId={this.props.userId}
						username={this.props.userName}
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

class AuthApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			logged: false,
			user: {},
			currentProvider: "",
		};
		this.nodes = {};

		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLoginFailure = this.onLoginFailure.bind(this);
		this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
		this.onLogoutFailure = this.onLogoutFailure.bind(this);
		this.logout = this.logout.bind(this);
	}

	login(e) {
		const { dispatch } = this.props;
		const role = e.target.getAttribute("data-role");
		if (role === "admin") dispatch(login(role, true, 4));
		else if (role === "user") dispatch(login(role, false, 1));
		else dispatch(logout());
	}

	setNodeRef(provider, node) {
		if (node) {
			this.nodes[provider] = node;
		}
	}

	onLoginSuccess(user) {
		console.log(user);

		this.setState({
			logged: true,
			currentProvider: user._provider,
			user,
		});
	}

	onLoginFailure(err) {
		console.error(err);

		this.setState({
			logged: false,
			currentProvider: "",
			user: {},
		});
	}

	onLogoutSuccess() {
		this.setState({
			logged: false,
			currentProvider: "",
			user: {},
		});
	}

	onLogoutFailure(err) {
		console.error(err);
	}

	logout() {
		const { logged, currentProvider } = this.state;

		if (logged && currentProvider) {
			this.nodes[currentProvider].props.triggerLogout();
		}
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<div className="container content">
					<Header
						title="scoreboard"
						login={this.login.bind(this)}
						isAdmin={this.props.isAdmin}
						username={this.props.userName}
						subtitle="AAAAAA"
					/>
					<p>HERE I AM</p>
					<div>
						<SocialButton
							autoCleanUri
							provider="github"
							gatekeeper="http://localhost:9999"
							appId="2697b9e84805797798bd"
							redirect="http://localhost:9000"
							onLoginSuccess={this.onLoginSuccess}
							onLoginFailure={this.onLoginFailure}
							onLogoutSuccess={this.onLogoutSuccess}
							getInstance={this.setNodeRef.bind(this, "github")}
							key={"github"}
						>
							Login with GitHub OAuth
						</SocialButton>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	const { user, challengeData, submissionData, datasetData, selectedChallege } = state;
	return {
		challenges: challengeData.challenges,
		selectedChallege: selectedChallege.challenge,
		userName: user.name,
		isAdmin: user.isAdmin,
		userId: user.userId,
		submissions: submissionData.submissions,
		datasets: datasetData.datasets,
	};
};

export const Home = connect(mapStateToProps)(HomeApp);
export const Challenge = connect(mapStateToProps)(ChallengeApp);
export const Auth = connect(mapStateToProps)(AuthApp);

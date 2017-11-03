import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "./HeaderContainer.jsx";
import { HomeTabs } from "./Home.jsx";
import { fetchChallenges, login, logout } from "../actions/index";
import { Footer } from "../components/Footer.jsx";

class App extends Component {
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

const mapStateToProps = function(state) {
	const { challengeData, user } = state;
	return {
		challenges: challengeData.challenges,
		isFetching: challengeData.isFetching,
		userName: user.name,
		isAdmin: user.isAdmin,
	};
};

export default connect(mapStateToProps)(App);

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SocialButton from "../components/SocialButton.jsx";
import { login, logout, node } from "../actions/index";

@connect(state => {
	return {
		userName: state.user.name,
		isAdmin: state.user.isAdmin,
		userId: state.user.userId,
	};
})
export class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	onLoginSuccess(user) {
		const { dispatch } = this.props;
		dispatch(login(user.profile));
	}

	saveForLogout(the_node) {
		const { dispatch } = this.props;
		dispatch(node(the_node));
	}

	logout() {
		const { dispatch } = this.props;
		dispatch(logout());
	}

	render() {
		let log_in_out = (
			<SocialButton
				autoCleanUri
				provider="github"
				gatekeeper="https://scoreboard-gatekeeper.herokuapp.com"
				appId="2697b9e84805797798bd"
				redirect={this.props.redirect}
				onLoginSuccess={this.onLoginSuccess.bind(this)}
				getInstance={this.saveForLogout.bind(this)}
				scope="read:user"
			>
				login >>
			</SocialButton>
		);
		if (this.props.username) {
			const admin = this.props.isAdmin ? " (admin)" : "";
			log_in_out = (
				<span className="clickable" onClick={this.logout.bind(this)}>
					{this.props.username} {admin} logout >>
				</span>
			);
		}
		return (
			<div className="row">
				<header>
					<div className="back">
						<Link to="/">
							<span className="clickable">&lt;&lt; back</span>
						</Link>
					</div>
					<div className="login" id="login-section">
						{log_in_out}
					</div>
					<div className="title">
						<Link to="/">
							<span className="clickable">{this.props.title}</span>
						</Link>
					</div>
					<div className="subtitle">{this.props.subtitle}</div>
				</header>
			</div>
		);
	}
}

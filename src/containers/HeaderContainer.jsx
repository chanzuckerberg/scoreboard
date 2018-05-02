import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

	logout() {
		const { dispatch } = this.props;
		dispatch(logout());
	}

	render() {
		let log_in_out = <a href="/auth/github">login >></a>;
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

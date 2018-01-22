import React from "react";
import { LoginModal } from "../components/Header.jsx";
import { Link } from "react-router-dom";

export class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
		};
	}

	loginClick() {
		this.setState({ modalOpen: true });
	}

	closeModal() {
		this.setState({ modalOpen: false });
	}

	login(e) {
		this.props.login(e);
		this.closeModal();
	}

	render() {
		// TODO This is really hacked, revise for full app
		let login = "login >>";
		if (this.props.username) {
			const admin = this.props.isAdmin ? " (admin)" : "";
			login = `${this.props.username} ${admin} logout >>`;
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
						<span className="clickable" onClick={this.loginClick.bind(this)}>{login}</span>
					</div>
					<div className="title">
						<Link to="/">
							<span className="clickable">{this.props.title}</span>
						</Link>
					</div>
					<div className="subtitle">{this.props.subtitle}</div>
				</header>
				<LoginModal
					isOpen={this.state.modalOpen}
					login={this.login.bind(this)}
					close={this.closeModal.bind(this)}
				/>
			</div>
		);
	}
}

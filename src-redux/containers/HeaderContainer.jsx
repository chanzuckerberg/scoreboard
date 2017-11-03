import React from "react";
import { LoginModal } from "../components/Header.jsx";

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
					<div className="pull-left title">
						<h1 className="clickable">{this.props.title}</h1>
						<h3>{this.props.subtitle}</h3>
					</div>
					<div className="pull-right clickable" id="login-section">
						<span onClick={this.loginClick.bind(this)}>{login}</span>
					</div>
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

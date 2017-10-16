import React from "react";
import { Link } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';


const LoginModal = props => {
	return (
		<Modal show={props.isOpen} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>Who would you like to be?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Button bsStyle="info" onClick={props.login} data-role="admin" >Admin</Button>
				<Button bsStyle="info" onClick={props.login}  data-role="user">User</Button>
				<Button bsStyle="info" onClick={props.login}  data-role="">Logged Out</Button>
			</Modal.Body>
		</Modal>
	)
}
export class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
		};
	}

	loginClick() {
		this.setState({modalOpen: true})
	}

	closeModal() {
		this.setState({modalOpen: false})
	}

	login(e) {
		 this.props.login(e);
		 this.closeModal()
	}

	render() {
		// TODO This is really hacked, revise for full app
		let login = "login >>"
		if (this.props.role === "admin") login = "Role: admin logout >>"
		else if (this.props.role) login = `Role ${this.props.role} logout >>`
		return (
			<div className="row">
				<header>
					<div className="pull-left title">
						<Link to="/">
							<h1 className="clickable">{this.props.title}</h1>
						</Link>
						<h3>{this.props.subtitle}</h3>
					</div>
					<div className="pull-right clickable" id="login-section">
						<span  onClick={this.loginClick.bind(this)}>{login}</span>
					</div>
				</header>
				<LoginModal isOpen={this.state.modalOpen} login={this.login.bind(this)} close={this.closeModal.bind(this)} />

			</div>
		)
	}
};

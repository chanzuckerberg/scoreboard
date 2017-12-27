import React from "react";
import { Modal, Button } from "react-bootstrap";

export const LoginModal = props => {
	return (
		<Modal show={props.isOpen} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>Who would you like to be?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Button bsStyle="info" onClick={props.login} data-role="admin">
					Admin
				</Button>
				<Button bsStyle="info" onClick={props.login} data-role="user">
					User
				</Button>
				<Button bsStyle="info" onClick={props.login} data-role="">
					Logged Out
				</Button>
			</Modal.Body>
		</Modal>
	);
};

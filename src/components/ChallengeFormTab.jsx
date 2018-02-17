import React from "react";
import { SubmitModal } from "./ChallengePage.jsx";
import { ChallengeFormContainer } from "../containers/ChallengeFormContainer.jsx";
import { config } from "../scoreboard.cfg";

export class ChallengeFormTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
		};
	}

	closeModal() {
		this.setState({ modalOpen: false });
	}

	openModal() {
		this.setState({ modalOpen: true });
	}

	render() {
		const modalId = "submitModal";
		let exampleFile = "";
		if (this.props.challengeName) {
			exampleFile = (
				<a
					className="clickable underline"
					download
					href={config.challenges[this.props.challengeName].examplefile}
				>
					Example Submission
				</a>
			);
		}
		return (
			<div className="col-md-12 tab-content">
				<div>
					<p>
						<span className="control-label">Instructions</span> Etiam a diam nec orci
						porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris
						a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien
						sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh.
						Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor.
						Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.{" "}
						{exampleFile}
					</p>
				</div>
				<ChallengeFormContainer handleSuccess={this.openModal.bind(this)} />
				<SubmitModal
					isOpen={this.state.modalOpen}
					close={this.closeModal.bind(this)}
					id={modalId}
				/>
			</div>
		);
	}
}

import React from "react";
import { SubmitModal } from "./ChallengePage.jsx";
import { ChallengeFormContainer } from "../containers/ChallengeFormContainer.jsx";

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
		if ("example_file" in this.props.challenge) {
			exampleFile = (
				<a className="clickable underline" download href={this.props.challenge.example_file}>
					Example Submission
				</a>
			);
		}
		return (
			<div className="col-md-12 tab-content" style={{ borderColor: this.props.challenge.color }}>
				<div>
					<p>
						<h3>Submission instructions:</h3>
						Fill in your information in the fields below.
						<ul>
							<li>Submission name should be the name of the your team.</li>
							<li>
								GitHub repo should be a link to a GitHub repository where the code that performs the
								analysis and creates your solution result is hosted.
							</li>
							<li>Results file is the path to a csv file with your challenge solution result.</li>
							<li>
								Link(s) to publications is an optional field where you can enter links to
								publications, that are relevant to this challenge, where you are an author. Submit a
								comma separated list of links.
							</li>
							<li>
								Institution should be your affiliated academic institution or school. This is an
								optional field.
							</li>
							<li>
								Keep private allows you to submit a response where only you and an admin will be
								able to see scores
							</li>
						</ul>
						When you have filled in the required fields and any optional fields, press the submit
						button.
					</p>

					{exampleFile}
				</div>
				<ChallengeFormContainer handleSuccess={this.openModal.bind(this)} />
				<SubmitModal
					isOpen={this.state.modalOpen}
					close={this.closeModal.bind(this)}
					id={modalId}
					challenge={this.props.challenge}
				/>
			</div>
		);
	}
}

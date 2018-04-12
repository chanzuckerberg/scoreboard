import React from "react";
import { ChallengeReduxForm } from "../components/ChallengeForm.jsx";
import { connect } from "react-redux";
import { SubmissionError } from "redux-form";
import { fetchOneChallenge } from "../actions/index";

@connect(state => {
	return {
		challengeName: state.selectedChallege.challenge.name,
		challengeId: state.selectedChallege.challenge.id,
		challenge: state.selectedChallege.challenge,
		userID: state.user.userId,
	};
})
export class ChallengeFormContainer extends React.Component {
	submit(values) {
		const { dispatch } = this.props;
		// print the form values to the console
		return new Promise((resolve, reject) => {
			if (!(this.props.userID && this.props.userID !== -1)) {
				throw new SubmissionError({
					_error: "You must be logged in to submit an algorithm.",
				});
			} else {
				let form = new FormData();
				Object.keys(values).forEach(function(key) {
					form.set(key, values[key]);
				});
				form.set("userid", this.props.userID);
				form.set("challengeid", this.props.challengeId);
				fetch("/api/submitresults", {
					method: "POST",
					body: form,
				})
					.then(data => {
						if (data.status === 422) {
							data.json().then(json_data => {
								reject(new SubmissionError(json_data));
							});
						} else if (data.status === 200) {
							this.props.handleSuccess();
							dispatch(fetchOneChallenge(this.props.challengeId));
							resolve();
						}
					})
					.catch();
			}
		});
	}

	render() {
		return (
			<ChallengeReduxForm challenge={this.props.challenge} onSubmit={this.submit.bind(this)} />
		);
	}
}

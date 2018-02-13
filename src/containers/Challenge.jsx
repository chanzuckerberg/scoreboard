import React from "react";
import { connect } from "react-redux";
import { Tabs } from "../components/Tabs.jsx";
import {
	About,
	SubmitModal,
	Datasets,
	FormErrorMessage,
	LoaderGif,
} from "../components/ChallengePage.jsx";
import { Algorithms } from "./AlgorithmContainer.jsx";
import { config } from "../scoreboard.cfg";

class ChallengeTabsClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "",
			loading: false,
		};
	}

	clickLink(e, data) {
		const activetab = e.target.getAttribute("data-tabname");
		// toggle if the new tab is the same as the old, otherwise switch tabs
		if (activetab === this.state.active) this.setState({ active: "" });
		else this.setState({ active: activetab });
	}

	render() {
		let aboutContent = "";
		let challengeColor = "rgb(110, 180, 255)";
		if (this.props.challengeName) {
			aboutContent = config.challenges[this.props.challengeName.toLowerCase()].about;
			challengeColor = config.challenges[this.props.challengeName.toLowerCase()].color;
		}
		let content = "";
		const dlSize = "83 GB";
		const scoreCategories = ["Score 1", "Score 2", "Score 3", "Score 4", "Score 5", "Score 6"];
		if (this.state.active === "about") {
			content = <About content={aboutContent} key="about" />;
		} else if (this.state.active === "datasets") {
			content = (
				<Datasets key="dataset" datasets={this.props.datasets} downloadsize={dlSize} />
			);
		} else if (this.state.active === "submit") {
			content = <SubmitChallenge key="submit" />;
		}
		content = [
			content,
			<Algorithms
				key="algorithms"
				isAdmin={this.props.isAdmin}
				userId={this.props.userId}
				data={this.props.submissions}
				categories={scoreCategories}
			/>,
		];

		return (
			<Tabs
				tabs={["about", "datasets", "submit"]}
				onclick={this.clickLink.bind(this)}
				activetab={this.state.active}
				content={content}
				color={challengeColor}
			/>
		);
	}
}

class SubmitChallengeClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			submission: "",
			repo: "",
			publications: "",
			institution: "",
			private: false,
			errors: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target_name = event.target.id;
		let new_state = {};
		new_state[target_name] =
			event.target.type === "checkbox" ? event.target.checked : event.target.value;
		this.setState(new_state);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ errors: false });
		const is_valid = this.validateForm();
		// Check for login
		if (!(this.props.userID && this.props.userID !== -1)) {
			is_valid.valid_form = false;
			is_valid.validation_errors.login = "You must be logged in to submit an algorithm.";
		}
		if (is_valid.valid_form) {
			let data = new FormData(event.target);
			data.set("userid", this.props.userID);
			data.set("challengeid", this.props.challengeId);
			// clean up private checkbox in form
			if (data.get("private") === "") data.set("private", true);
			else data.set("private", false);
			// promise validate
			this.readFile().then(
				// on success submit
				function(result) {
					this.submitForm(data);
				}.bind(this),
				// on error set error state
				function(err) {
					this.setState({ errors: { msg: err.error } });
				}.bind(this)
			);
		} else {
			this.setState({ errors: is_valid.validation_errors });
		}
	}

	submitForm(data) {
		this.setState({ errors: false, loading: true });
		// TODO move this to redux?
		fetch("/api/submitresults", {
			method: "POST",
			body: data,
		}).then(data => {
			if (data.status === 422) {
				this.setState({ errors: {} });
				data.json().then(json_data => {
					this.setState({ errors: json_data["errors"] });
				});
			} else if (data.status === 200) {
				this.setState({ modalOpen: true });
			}
			this.setState({ loading: false });
		});
	}

	readFile() {
		return new Promise((resolve, reject) => {
			const results_file = this.results.files[0];
			const reader = new FileReader();
			reader.onload = function(e) {
				let contents = e.target.result;
				let header = contents.substr(0, contents.indexOf("\n"));
				if (header !== "\tcall\tp_doublet") {
					reject({ error: "Bad header" });
				} else {
					resolve({ valid: true, error: "" });
				}
			};
			reader.onerror = function(e) {
				reject({ error: "Error reading file" });
			};
			reader.readAsText(results_file);
		});
	}

	// TODO use third party package for form validation
	validateForm(valid, error) {
		let valid_form = true;
		let validation_errors = {};
		// Ensure name, gh repo, file
		if (this.state.submission === "") {
			valid_form = false;
			validation_errors["submission"] = { msg: "Submission Name is a required field" };
		}
		// Validate ghrepo is actual repo
		if (this.state.repo === "" || this.state.repo.toLowerCase().indexOf("github.com") === -1) {
			valid_form = false;
			validation_errors["repo"] = {
				msg: "Github Repo is required and must contain a valid link to a github repo.",
			};
		}
		if (!this.results.files[0]) {
			valid_form = false;
			validation_errors["file"] = { msg: "Results file is required." };
		}
		return { valid_form, validation_errors };
	}

	closeModal() {
		this.setState({ modalOpen: false });
	}

	render() {
		const modalId = "submitModal";
		let exampleFile = "";
		let error_message = "";
		let submission_error_message = "";
		let repo_error_message = "";
		let file_error_message = "";
		if (this.props.challengeName) {
			exampleFile = (
				<a
					className="clickable underline"
					download
					href={config.challenges[this.props.challengeName.toLowerCase()].examplefile}
				>
					Example Submission
				</a>
			);
		}
		if (this.state.errors) {
			error_message = (
				<div className="submit-error">Please check errors before submitting.</div>
			);
			if ("login" in this.state.errors) {
				error_message = <div className="submit-error">{this.state.errors.login}</div>;
			}
			if ("submission" in this.state.errors)
				submission_error_message = (
					<FormErrorMessage errormessage={this.state.errors.submission.msg} />
				);
			if ("repo" in this.state.errors) {
				repo_error_message = <FormErrorMessage errormessage={this.state.errors.repo.msg} />;
			}
			if ("file" in this.state.errors) {
				file_error_message = <FormErrorMessage errormessage={this.state.errors.file.msg} />;
			}
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

				<form
					onSubmit={this.handleSubmit.bind(this)}
					role="form"
					className="form-horizontal"
				>
					<div className="form-group ">
						<label className="col-sm-4 control-label" htmlFor="submission">
							submission name *
						</label>
						<div className="col-sm-6">
							<input
								id="submission"
								name="submission"
								onChange={this.handleChange}
								className="form-control"
							/>
						</div>
						{submission_error_message}
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="repo">
							github repo *
						</label>
						<div className="col-sm-6">
							<input
								id="repo"
								name="repo"
								onChange={this.handleChange}
								className="form-control"
							/>
						</div>
						{repo_error_message}
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="results">
							results file *
						</label>
						<div className="col-sm-6">
							<input
								id="results"
								name="results"
								type="file"
								ref={input => (this.results = input)}
								className="form-control"
							/>
						</div>
						{file_error_message}
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="publications">
							link(s) to publications
						</label>
						<div className="col-sm-6">
							<input
								id="publications"
								name="publications"
								onChange={this.handleChange}
								className="form-control"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="institution">
							institution
						</label>
						<div className="col-sm-6">
							<input
								id="institution"
								name="institution"
								onChange={this.handleChange}
								className="form-control"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="private">
							keep private
						</label>
						<div className="col-sm-6">
							<input
								id="private"
								name="private"
								onChange={this.handleChange}
								type="checkbox"
								value=""
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-4 col-sm-6">
							<button type="submit" className="btn btn-info">
								Submit
							</button>
							<LoaderGif display={this.state.loading} />
							{error_message}
						</div>
					</div>
				</form>
				<SubmitModal
					isOpen={this.state.modalOpen}
					close={this.closeModal.bind(this)}
					id={modalId}
				/>
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	const { selectedChallege, user } = state;
	return {
		challengeName: selectedChallege.challenge.name,
		challengeId: selectedChallege.challenge.id,
		userID: user.userId,
	};
};

export const ChallengeTabs = connect(mapStateToProps)(ChallengeTabsClass);
export const SubmitChallenge = connect(mapStateToProps)(SubmitChallengeClass);

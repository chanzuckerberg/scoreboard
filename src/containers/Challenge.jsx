import React from "react";
import { connect } from "react-redux";
import { Tabs } from "../components/Tabs.jsx";
import { About, SubmitModal, Datasets } from "../components/ChallengePage.jsx";
import { Algorithms } from "./AlgorithmContainer.jsx";
import { config } from "../scoreboard.cfg";

class ChallengeTabsClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "",
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
		};
	}

	submitForm() {
		this.setState({ modalOpen: true });
	}

	closeModal() {
		this.setState({ modalOpen: false });
	}

	render() {
		const modalId = "submitModal";
		let exampleFile = "";
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

				<form role="form" className="form-horizontal">
					<div className="form-group ">
						<label className="col-sm-4 control-label" htmlFor="submission">
							submission name *
						</label>
						<div className="col-sm-6">
							<input id="submission" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="repo">
							github repo *
						</label>
						<div className="col-sm-6">
							<input id="repo" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="results">
							results file *
						</label>
						<div className="col-sm-6">
							<input id="results" type="file" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="publications">
							link(s) to publications
						</label>
						<div className="col-sm-6">
							<input id="publications" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="institution">
							institution
						</label>
						<div className="col-sm-6">
							<input id="institution" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="private">
							keep private
						</label>
						<div className="col-sm-6">
							<input id="private" type="checkbox" value="" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-4 col-sm-6">
							<button
								onClick={this.submitForm.bind(this)}
								type="button"
								className="btn btn-info"
							>
								Submit
							</button>
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
	const { selectedChallege } = state;
	return {
		challengeName: selectedChallege.challenge.name,
	};
};

export const ChallengeTabs = connect(mapStateToProps)(ChallengeTabsClass);
export const SubmitChallenge = connect(mapStateToProps)(SubmitChallengeClass);

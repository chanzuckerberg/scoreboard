import React from "react";
import { connect } from "react-redux";
import { Tabs } from "../components/Tabs.jsx";
import { About, Datasets } from "../components/ChallengePage.jsx";
import { ChallengeFormTab } from "../components/ChallengeFormTab.jsx";
import { Algorithms } from "./AlgorithmContainer.jsx";

@connect(state => {
	return {
		challenge: state.selectedChallege.challenge,
		challengeName: state.selectedChallege.challenge.name,
		challengeId: state.selectedChallege.challenge.id,
		userID: state.user.userId,
		datasets: state.datasetData.datasets,
	};
})
export class ChallengeTabs extends React.Component {
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
			aboutContent = this.props.challenge.about;
			challengeColor = this.props.challenge.color;
		}
		let content = "";
		const dlSize = this.props.challenge.data_size;
		const scoreCategories = this.props.challenge.scores || [];
		if (this.state.active === "about") {
			content = <About color={challengeColor} content={aboutContent} key="about" />;
		} else if (this.state.active === "datasets") {
			content = (
				<Datasets
					key="dataset"
					color={challengeColor}
					challenge={this.props.challengeName.toLowerCase()}
					datasets={this.props.datasets}
					data_path={this.props.challenge.data_path}
					downloadsize={dlSize}
				/>
			);
		} else if (this.state.active === "submit") {
			if (this.props.userID && this.props.userID > -1) {
				content = <ChallengeFormTab key="submission" challenge={this.props.challenge} />;
			} else {
				content = (
					<div
						key="submission-login-message"
						className="col-md-12 tab-content"
						style={{ borderColor: this.props.challenge.color }}
					>
						You must be logged in to submit an entry
					</div>
				);
			}
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

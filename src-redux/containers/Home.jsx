import React from "react";
import { About, Challenges, SlackHelp, FAQ, Tabs } from "../components/HomePage.jsx";

export class HomeTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.active
		};
	}

	clickLink(e, data) {
		const activetab = e.target.getAttribute("data-tabname");
		this.setState({ active: activetab });
	}

	render() {
		let content = "";
		if (this.state.active === "about") {
			content = (
				<div>
					<div className="row">
						<About />
					</div>
					<div className="row">
						<Challenges challenges={this.props.challenges} />
					</div>
				</div>
			);
		} else if (this.state.active === "help") {
			content = (
				<div>
					<SlackHelp />
					<FAQ />
				</div>
			);
		}
		return (
			<Tabs
				tabs={["about", "help"]}
				onclick={this.clickLink.bind(this)}
				activetab={this.state.active}
				content={content}
			/>
		);
	}
}

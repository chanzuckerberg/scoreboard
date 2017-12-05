import React from "react";
import { About, Challenges, SlackHelp, FAQ } from "../components/HomePage.jsx";
import { Tabs } from "../components/Tabs.jsx";

class SubmitChallenge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
	}

	submitForm() {
		this.setState({modalOpen: true})
	}

	closeModal() {
		this.setState({modalOpen: false})
	}

	render() {
		const modalId = "submitModal"
		return (
			<div>
				<div className="col-md-12 tab-content">
					<p>
						<strong>Instructions:</strong> Etiam a diam nec orci porta mattis sit amet in leo. Proin
						placerat
						velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida
						sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum
						malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio,
						interdum
						vestibulum dolor mattis non.
					</p>
				</div>

				<form role="form" className="form-horizontal">
					<div className="form-group ">
						<label className="col-sm-4 control-label" htmlFor="submission">
							submission name *
						</label>
						<div className="col-sm-6">
							<input id="submission" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="repo">
							github repo *
						</label>
						<div className="col-sm-6">
							<input id="repo" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="results">
							results file *
						</label>
						<div className="col-sm-6">
							<input id="results" type="file" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="publications">
							link(s) to publications
						</label>
						<div className="col-sm-6">
							<input id="publications" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="institution">
							institution
						</label>
						<div className="col-sm-6">
							<input id="institution" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="private">
							keep private
						</label>
						<div className="col-sm-6">
							<input id="private" type="checkbox" value=""/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-4 col-sm-6">
							<button onClick={this.submitForm.bind(this)} type="button" className="btn btn-info">
								Submit
							</button>
						</div>
					</div>
				</form>
				<SubmitModal isOpen={this.state.modalOpen} close={this.closeModal.bind(this)} id={modalId}/>
			</div>
		);
	}
};


export class HomeTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.active,
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

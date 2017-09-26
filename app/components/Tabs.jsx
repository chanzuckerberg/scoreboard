import React from "react";
import {Link} from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import {slugify} from "../utils/utils";
import {Algorithms} from "./Algorithms.jsx";

const About = props => {
	return (
		<div className="col-md-12 tab-content">
			<p>
				Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a,
				accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque
				dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a
				lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.
			</p>
		</div>
	);
};
const Challenges = props => {
	return (
		<div>
			<Challenge name="doublet detection" id={1} datasetcount={1} submissions={50}/>
			<Challenge name="batch effect correction" id={2} datasetcount={2} submissions={11}/>
			<Challenge name="cell identification" id={3} datasetcount={5} submissions={5}/>
			<Challenge name="experimental design" id={4} datasetcount={2} submissions={201}/>
			<Challenge name="cell type clustering" id={5} datasetcount={9} submissions={3}/>
		</div>
	);
};
const Challenge = props => {
	const route_id = slugify(props.name);
	return (
		<div className="col-md-4 challenge">
			<Link to={`/challenge/${route_id}`}>
				<img className="pull-left dataset-img" src="http://via.placeholder.com/100/00ccff" alt="placeholder"/>
				<div>
					<h4>{props.name}</h4>
					<div>short description of the challenge</div>
					<div>datasets: {props.datasetcount}</div>
					<div>submissions: {props.submissions}</div>
				</div>
			</Link>
		</div>
	);
};

const SlackHelp = props => {
	return (
		<div className="col-md-12 tab-content">
			The best way to get help is to join our slack channel. Ask questions and read through discussion.
		</div>
	);
};

const FAQ = props => {
	return (
		<div className="col-md-12">
			<p className="question">What is a challenge?</p>
			<p className="answer">
				Mauris ac lectus ipsum. Sed malesuada velit ut euismod ultrices. Quisque aliquet feugiat arcu, ut
				rhoncus magna ornare at. Nullam consequat nec enim vel bibendum. Duis id sem sed turpis mattis pharetra.
				Cras ultricies risus at mattis lobortis. Maecenas sodales ipsum sit amet semper commodo. Cras sagittis
				gravida dui, sed convallis metus semper vel.
			</p>
			<p className="question">Why do I need to use git to submit?</p>
			<p className="answer">
				Phasellus aliquet volutpat magna eu sodales. Donec et urna eget ipsum mollis euismod. Nulla laoreet
				magna at varius congue. Phasellus nec enim sed ante tempus sagittis. Integer feugiat rhoncus justo, ut
				sodales tellus. Vivamus feugiat porttitor ligula, sed lacinia diam iaculis vitae. Nulla a nulla
				pharetra, pharetra mauris id, molestie odio. Morbi sapien libero, porttitor vitae enim vel, placerat
				elementum dui. Aenean tristique nulla ante, et vulputate orci pulvinar ut. Sed posuere quis massa eget
				mattis. Mauris eget justo nunc. Nulla in interdum felis. Nunc aliquet auctor vulputate. Phasellus
				accumsan porttitor massa, et tincidunt leo varius eu. Nunc ligula ligula, auctor at tortor vel,
				vulputate tincidunt diam.
			</p>
			<p className="question">Do I need to be a member of a university?</p>
			<p className="answer">
				Mauris vel venenatis arcu. Cras tincidunt magna sit amet egestas molestie. Duis tincidunt urna a augue
				tincidunt, quis tempor velit placerat. Vestibulum placerat tempus enim et condimentum. Phasellus quis
				mauris dapibus, dignissim metus a, dignissim elit. Cras gravida, lacus non ultrices varius, justo leo
				volutpat orci, vitae tempor libero nisi eget odio. Aenean eu pharetra augue, eu porttitor justo. Sed
				sollicitudin libero eget elit cursus, in hendrerit lorem viverra. In porttitor nisi eu mattis viverra.
			</p>
		</div>
	);
};
class SubmitChallenge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
	}

	submitForm () {
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

const SubmitModal = props => {
	return (
		<Modal show={props.isOpen} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>Successful Submission</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Thank you! Your submission is now in review. You will receive and e-mail when your entry is availble to view on the bakeoff site.
		        <br/>
				<Button bsStyle="info" onClick={props.close}>OK</Button>
			</Modal.Body>

		</Modal>
	)
}




const Tabs = props => {
	let tablinks = props.tabs.map((tabname, idx) => {
		let tabclass = "col-md-2 tab clickable ";
		if (tabname === props.activetab) tabclass += "tab-selected";
		return (
			<div key={"my_tab_link_" + idx} className={tabclass} data-tabname={tabname} onClick={props.onclick}>
				{tabname} //
			</div>
		);
	});
	return (
		<div>
			<div className="row">{tablinks}</div>
			{props.content}
		</div>
	);
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
		this.setState({active: activetab});
	}

	render() {
		let content = "";
		if (this.state.active === "about") {
			content = (
				<div>
					<div className="row">
						<About/>
					</div>
					<div className="row">
						<Challenges/>
					</div>
				</div>
			);
		} else if (this.state.active === "help") {
			content = (
				<div>
					<SlackHelp/>
					<FAQ/>
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

export class ChallengeTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.active,
		};
	}

	clickLink(e, data) {
		const activetab = e.target.getAttribute("data-tabname");
		this.setState({active: activetab});
	}

	render() {
		let content = "";
		const data = [
			{
				algorithm: "Algorithm #1",
				ghname: "hca",
				ghlink: "https://github.com/chanzuckerberg/hca-bakeoff-site",
				data: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
				additionalData: [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
				dateSubmitted:  new Date(2017, 8, 1),
				publications: ["https://chanzuckerberg.com/"]
			},
			{
				algorithm: "B-Algorithm #2",
				ghname: "czi",
				ghlink: "https://github.com/chanzuckerberg/hca-bakeoff-site",
				data: [0.6, 0.5, 0.3, 0.4, 0.89, 0.3],
				additionalData: [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
				dateSubmitted:  new Date(2017, 9, 1),
				publications: ["https://chanzuckerberg.com/", "https://chanzuckerberg.com/", ]
			},
			{
				algorithm: "Algorithm #3",
				ghname: "much longer name",
				ghlink: "https://github.com/chanzuckerberg/hca-bakeoff-site",
				data: [0.4, 0.11, 0.1, 0.99, 0.46, 0.32],
				additionalData: [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
				dateSubmitted:  new Date(2017, 7, 1),
			},
		];
		const scoreCategories = ["Score 1", "Score 2", "Score 3", "Score 4", "Score 5", "Score 6"]

		if (this.state.active === "about") {
			content = <About/>;
		} else if (this.state.active === "datasets") {
			content = "Datasets";
		} else if (this.state.active === "submit") {
			content = <SubmitChallenge/>;
		}
		content = [content, <Algorithms data={data} categories={scoreCategories}/>];

		return (
			<Tabs
				tabs={["about", "datasets", "submit"]}
				onclick={this.clickLink.bind(this)}
				activetab={this.state.active}
				content={content}
			/>
		);
	}
}

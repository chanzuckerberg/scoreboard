import React from 'react';
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';
import {slugify} from "../../src-redux/utils/utils";

export class Algorithms extends React.Component {

	constructor(props) {
		super(props);
		let activeIndicies = {}
		props.data.forEach((item) => {
			activeIndicies[item.algorithm] = false
		})
		this.ALGO_SORT_OPTIONS = ["Date Submitted", "Name", "Submitter"]
		this.state = {
			data: [],
			sortedBy: "Name",
			activeIndicies
		};
	}

	onclick(e, data) {
		const sortAttr = e.target.getAttribute("data-sortby")
		const sortIdx = parseInt(e.target.getAttribute("data-idx")) - this.ALGO_SORT_OPTIONS.length
		let sortedData = this.state.data.slice()
		if (sortAttr === "Date Submitted") {
			sortedData.sort(function (x, y) {
				return y.dateSubmitted - x.dateSubmitted
			})
		}
		else if (sortAttr === "Name") {
			sortedData.sort(function (x, y) {
				if (x.algorithm < y.algorithm) return -1
				if (x.algorithm > y.algorithm) return 1
				return 0
			})
		}
		else if (sortAttr === "Submitter") {
			sortedData.sort(function (x, y) {
				if (x.ghname < y.ghname) return -1
				if (x.ghname > y.ghname) return 1
				return 0
			})
		}
		else {
			sortedData.sort(function (x, y) {
				return y.data[sortIdx] - x.data[sortIdx]
			})
		}

		this.setState({data: sortedData, sortedBy: sortAttr})
	}

	activateIndex(name, e, data) {
		let activeIndicies = this.state.activeIndicies
		activeIndicies[name] = !activeIndicies[name]
		this.setState({activeIndicies: activeIndicies})
	}

	componentWillMount() {
		this.setState({data: this.props.data})
	}

	linkOnClick(e) {
		e.stopPropagation();
	}

	render() {
		const algorithms = this.state.data.map((item, idx) => {
			if (item.approved || this.props.role === "admin") {
				return (
					<AlgorithmElement
						active={this.state.activeIndicies[item.algorithm]}
						key={idx}
						linkOnClick={this.linkOnClick}
						title={item.algorithm}
						ghLink={item.ghlink}
						ghName={item.ghname}
						scores={item.data}
						detailedScores={item.additionalData}
						dateSubmitted={item.dateSubmitted}
						publications={item.publications}
						approved={item.approved}
						activate={this.activateIndex.bind(this, item.algorithm)}
					/>
				);
			}
		});
		const sortables = [...this.ALGO_SORT_OPTIONS, ...this.props.categories]
		let sortCategories = sortables.map((item, idx) => {
			let active = false
			if (this.state.sortedBy === item) active = true
			return <MenuItem key={"sort_item_" + idx} onClick={this.onclick.bind(this)} data-idx={idx}
							 data-sortby={item} eventKey={item} active={active}>{item}</MenuItem>
		})
		sortCategories =
			<DropdownButton  bsSize="small" className="dropdown-sort" bsStyle="success" id="AlgoSortDropdown"
							title={this.state.sortedBy}>{sortCategories}</DropdownButton>
		const dataCategories = this.props.categories.map((item) => {
			return <div className="col-sm-2 dataset-text" key={"algo_data_" + slugify(item)}>{item}</div>
		})

		return (
			<div>
				<div className="algorithms col-sm-10 col-sm-offset-1">
					<div className="row">
						<div className="col-sm-3 bold-text">Info</div>
						<div className="col-sm-6 bold-text ">Scores</div>
						<div className="col-sm-3">
							<label htmlFor="AlgoSortDropdown">Sort By: </label> {sortCategories}
						</div>
					</div>
					<div className="row">
						<div className="col-sm-9 col-sm-offset-3">
							<div className="row">
								{dataCategories}
							</div>
						</div>
					</div>
				</div>
				{algorithms}
			</div>
		);
	}
}


const AlgorithmElement = props => {
	let scores = props.scores.map((item, idx) => {
		return (
			<div key={"score_" + idx} className="single-score col-sm-2">
				<span className="score-span">{item.toFixed(2)}</span>
			</div>
		);
	});
	let activeClass = props.active ? "algorithm-selected" : ""
	let detailedScores = ""
	let detailedInfo = ""
	if (props.active) {
		detailedScores = props.detailedScores.map((item, idx) => {
			let eachDetailedScore = item.map((item2, idx2) => {
				return (
					<div key={"score_" + idx + "_" + idx2} className="single-score col-sm-2">
						<span className="score-span">{item2.toFixed(2)}</span>
					</div>
				);
			});
			return <div key={"detailed_score_" + idx} className="row">{eachDetailedScore}</div>
		});
		let publications = ""
		if (props.publications) {
			publications = props.publications.map((item, idx) => {
				return <a onClick={props.linkOnClick} target="_blank" href={item} key={"publication_" + idx}> ({idx + 1})</a>
			})
			publications = <h6>Publications: {publications}</h6>
		}
		detailedInfo = [
			<h6>{props.dateSubmitted.toLocaleDateString("en-US", {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}</h6>,
			publications
		]
	}
	const unapprovedClass = (props.approved) ? "" : " unapproved"
	const approveButton = (props.approved) ? "" : (<div className="col-sm-1">
		<Button className="admin-approve" bsSize="xsmall" bsStyle="info">Approve</Button><Button className="admin-approve" bsSize="xsmall" bsStyle="warning">Reject</Button>
	</div>)
	return (
		<div>
			<div data-idx={props.index}
				 className={"col-sm-offset-1 col-sm-10 algorithm " + activeClass + unapprovedClass}
				 onClick={props.activate}>
				<div className="row">
					<div className="col-sm-3">
						<h5 className="algo-name">{props.title}<a onClick={props.linkOnClick} target="_blank"
																  href={props.ghLink}> <i
							className="glyphicon glyphicon-link"/></a></h5>
						<h6 className="gh-name">by {props.ghName}</h6>
						{detailedInfo}
					</div>
					<div className="col-sm-9 scores">
						<div className="row">{scores}</div>
						<div className="detailed-scores">{detailedScores}</div>
					</div>
				</div>
			</div>
			{approveButton}
		</div>
	);

}
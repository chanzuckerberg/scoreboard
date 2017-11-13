import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { slugify } from "../utils/utils";
import { Algorithm } from "../components/Algorithm.jsx";

export class Algorithms extends React.Component {
	constructor(props) {
		super(props);
		let activeIndicies = {};
		props.data.forEach(item => {
			activeIndicies[item.algorithm] = false;
		});
		this.ALGO_SORT_OPTIONS = ["Date Submitted", "Name", "Submitter"];
		this.state = {
			data: [],
			sortedBy: "Name",
			activeIndicies,
		};
	}

	onclick(e, data) {
		const sortAttr = e.target.getAttribute("data-sortby");
		const sortIdx = parseInt(e.target.getAttribute("data-idx")) - this.ALGO_SORT_OPTIONS.length;
		let sortedData = this.state.data.slice();
		if (sortAttr === "Date Submitted") {
			sortedData.sort(function(x, y) {
				return y.dateSubmitted - x.dateSubmitted;
			});
		} else if (sortAttr === "Name") {
			sortedData.sort(function(x, y) {
				if (x.algorithm < y.algorithm) return -1;
				if (x.algorithm > y.algorithm) return 1;
				return 0;
			});
		} else if (sortAttr === "Submitter") {
			sortedData.sort(function(x, y) {
				if (x.ghname < y.ghname) return -1;
				if (x.ghname > y.ghname) return 1;
				return 0;
			});
		} else {
			sortedData.sort(function(x, y) {
				return y.data[sortIdx] - x.data[sortIdx];
			});
		}

		this.setState({ data: sortedData, sortedBy: sortAttr });
	}

	activateIndex(name, e, data) {
		let activeIndicies = this.state.activeIndicies;
		activeIndicies[name] = !activeIndicies[name];
		this.setState({ activeIndicies: activeIndicies });
	}

	componentWillMount() {
		this.setState({ data: this.props.data });
	}

	render() {
		const algorithms = this.state.data.map((item, idx) => {
			if (item.approved || this.props.isAdmin) {
				return (
					<Algorithm
						active={this.state.activeIndicies[item.algorithm]}
						key={idx}
						linkOnClick={Algorithms.linkOnClick}
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
		const sortables = [...this.ALGO_SORT_OPTIONS, ...this.props.categories];
		let sortCategories = sortables.map((item, idx) => {
			let active = false;
			if (this.state.sortedBy === item) active = true;
			return (
				<MenuItem
					key={"sort_item_" + idx}
					onClick={this.onclick.bind(this)}
					data-idx={idx}
					data-sortby={item}
					eventKey={item}
					active={active}
				>
					{item}
				</MenuItem>
			);
		});
		sortCategories = (
			<DropdownButton
				bsSize="small"
				className="dropdown-sort"
				bsStyle="success"
				id="AlgoSortDropdown"
				title={this.state.sortedBy}
			>
				{sortCategories}
			</DropdownButton>
		);
		const dataCategories = this.props.categories.map(item => {
			return (
				<div className="col-sm-2 dataset-text" key={"algo_data_" + slugify(item)}>
					{item}
				</div>
			);
		});

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
							<div className="row">{dataCategories}</div>
						</div>
					</div>
				</div>
				{algorithms}
			</div>
		);
	}
}

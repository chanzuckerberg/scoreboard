import React from "react";
import { connect } from "react-redux";
import { slugify } from "../utils/utils";
import { Algorithm } from "../components/Algorithm.jsx";
import { SortPane } from "../components/SortPane.jsx";
import { sortAlgorithms, toggleAlgortirhmActivation } from "../actions";

class AlgorithmsContainer extends React.Component {
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
		const { dispatch } = this.props;
		const sortAttr = e.target.getAttribute("data-sortby");
		const dataIdx = e.target.getAttribute("data-idx");
		dispatch(sortAlgorithms(sortAttr, dataIdx));
	}

	activateIndex(alID, e, data) {
		const { dispatch } = this.props;
		dispatch(toggleAlgortirhmActivation(alID));
	}

	componentWillMount() {
		this.setState({ data: this.props.data });
	}

	sortData() {
		const sortAttr = this.props.sortSelection;
		let sortedData = this.props.data.slice();
		if (sortAttr === "Date Submitted") {
			sortedData.sort(function(x, y) {
				return y.submission_date - x.submission_date;
			});
		} else if (sortAttr === "Name") {
			sortedData.sort(function(x, y) {
				if (x.name < y.name) return -1;
				if (x.name > y.name) return 1;
				return 0;
			});
		} else if (sortAttr === "Submitter") {
			sortedData.sort(function(x, y) {
				if (x.user_name < y.user_name) return -1;
				if (x.user_name > y.user_name) return 1;
				return 0;
			});
		} else {
			// Where can I get sort index from?
			const sortIdx = parseInt(this.props.dataIdx) - this.ALGO_SORT_OPTIONS.length;
			sortedData.sort(function(x, y) {
				return y.score_data.data[sortIdx] - x.score_data.data[sortIdx];
			});
		}
		return sortedData;
	}

	render() {
		let sortedData = this.sortData();
		const algorithms = sortedData.map(item => {
			if (
				(item.is_accepted && !item.is_private) ||
				this.props.isAdmin ||
				(item.is_private && item.user_id === this.props.userId)
			) {
				return (
					<Algorithm
						active={item.active}
						key={"submission_" + item.id}
						linkOnClick={Algorithms.linkOnClick}
						data={item}
						activate={this.activateIndex.bind(this, item.id)}
					/>
				);
			}
		});
		const sortables = [...this.ALGO_SORT_OPTIONS, ...this.props.categories];
		const sortPane = (
			<SortPane
				sortOptions={sortables}
				sortSelection={this.props.sortSelection}
				onSortSelect={this.onclick.bind(this)}
			/>
		);
		const dataCategories = this.props.categories.map(item => {
			return (
				<div
					className="dataset-text"
					style={{ width: "16.66%" }}
					key={"algo_data_" + slugify(item)}
				>
					{item}
				</div>
			);
		});

		return (
			<div>
				<div className="overview">
					<div className="overview-description">
						Each panel shows results for a different algorithm. Click a panel to see
						more info. Columns are scores, and rows are datasets.
					</div>
					<div className="overview-sort">{sortPane}</div>
				</div>
				<div className="algorithms score-labels">
					<div className="row">
						<div className="col-sm-9 col-sm-offset-3 score-labels-header">
							<div className="row">{dataCategories}</div>
						</div>
					</div>
				</div>
				{algorithms}
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	const { submissionData } = state;
	return {
		submissions: submissionData.submissions,
		sortSelection: submissionData.sortBy,
		dataIdx: submissionData.dataIdx,
	};
};

export const Algorithms = connect(mapStateToProps)(AlgorithmsContainer);

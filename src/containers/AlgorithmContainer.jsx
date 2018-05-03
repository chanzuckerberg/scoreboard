import React from "react";
import { connect } from "react-redux";
import { slugify } from "../utils/utils";
import { Algorithm } from "../components/Algorithm.jsx";
import { SortPane } from "../components/SortPane.jsx";
import { sortAlgorithms, toggleAlgortirhmActivation, approveOrRejectSubmission } from "../actions";
import { linkOnClick } from "../utils/utils";

@connect(state => {
	return {
		submissions: state.submissionData.submissions,
		sortSelection: state.submissionData.sortBy,
		dataIdx: state.submissionData.dataIdx,
		challengeName: state.selectedChallege.challenge.name,
		challengeId: state.selectedChallege.challenge.id,
		challenge: state.selectedChallege.challenge,
	};
})
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
		const { dispatch } = this.props;
		const sortAttr = e.target.getAttribute("data-sortby");
		const dataIdx = e.target.getAttribute("data-idx");
		dispatch(sortAlgorithms(sortAttr, dataIdx));
	}

	approveRejectOnClick(e) {
		const { dispatch } = this.props;
		const submissionid = e.target.getAttribute("data-submissionid");
		const approve = e.target.getAttribute("data-approve");
		dispatch(approveOrRejectSubmission(submissionid, approve, this.props.challengeId));
		linkOnClick(e);
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
		try {
			if (sortAttr === "Date Submitted") {
				sortedData.sort(function(x, y) {
					if (!x.submission_date) return 1;
					if (!y.submission_date) return -1;
					return y.submission_date - x.submission_date;
				});
			} else if (sortAttr === "Name") {
				sortedData.sort(function(x, y) {
					if (!x.name) return 1;
					if (!y.name) return -1;
					if (x.name.toLowerCase() < y.name.toLowerCase()) return -1;
					if (x.name.toLowerCase() > y.name.toLowerCase()) return 1;
					return 0;
				});
			} else if (sortAttr === "Submitter") {
				sortedData.sort(function(x, y) {
					if (!x.user_name) return 1;
					if (!y.user_name) return -1;
					if (x.user_name.toLowerCase() < y.user_name.toLowerCase()) return -1;
					if (x.user_name.toLowerCase() > y.user_name.toLowerCase()) return 1;
					return 0;
				});
			} else {
				// Where can I get sort index from?
				const sortIdx = parseInt(this.props.dataIdx) - this.ALGO_SORT_OPTIONS.length;
				sortedData.sort(function(x, y) {
					return y.score_data.data[sortIdx] - x.score_data.data[sortIdx];
				});
			}
		} catch (error) {
			console.error("Sort failed", error);
		}
		return sortedData;
	}

	render() {
		let sortedData = this.sortData();
		const algorithms = sortedData.map(item => {
			if (
				((item.is_accepted && !item.is_private) ||
					this.props.isAdmin ||
					(item.is_private && item.user_id === this.props.userId)) &&
				"data" in item.score_data
			) {
				return (
					<Algorithm
						active={item.active}
						key={"submission_" + item.id}
						data={item}
						challenge={this.props.challenge}
						approve={this.approveRejectOnClick.bind(this)}
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
		const category_width =
			this.props.categories && this.props.categories.length
				? 100 / (this.props.categories.length + 1)
				: 0;
		let dataCategories = this.props.categories.map(item => {
			return (
				<div
					className="dataset-text"
					style={{ width: category_width + "%" }}
					key={"algo_data_" + slugify(item)}
				>
					{item}
				</div>
			);
		});
		dataCategories.unshift(
			<div className="dataset-text" style={{ width: category_width + "%" }} key={"algo_data_label"}>
				Type
			</div>
		);

		return (
			<div>
				<div className="overview">
					<div className="overview-description">
						Each panel shows results for a different algorithm. Click a panel to see more info.
						Columns are scores, and rows are datasets.
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

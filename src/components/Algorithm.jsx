import React from "react";
import { linkOnClick } from "../utils/utils";
import { Button } from "react-bootstrap";
import { colorScale, textColor } from "../utils/color-utils";
export const Algorithm = props => {
	let score_count = 1;
	let score_width = 100;
	if (props.data.score_data.data.length > 0) {
		score_count = props.data.score_data.data.length;
		if (score_count > 10) score_count = 10;
		score_width = 100 / score_count;
	}
	const algoColor = props.color;
	let bgColor = colorScale(algoColor, item);
	let text = textColor(bgColor);
	let scores = props.data.score_data.data.map((item, idx) => {
		return (
			<div key={"score_" + idx} style={{ width: score_width + "%" }} className="single-score">
				<span className="score-span" style={{ backgroundColor: bgColor, color: text }}>
					{item.toFixed(2)}
				</span>
			</div>
		);
	});
	let activeClass = props.active ? "algorithm-selected" : "";
	let privateClass = props.data.is_private ? " algorithm-private" : "";
	let detailedScores = "";
	let detailedInfo = "";
	if (props.active) {
		detailedScores = props.data.score_data.additionalData.map((item, idx) => {
			let eachDetailedScore = item.map((item2, idx2) => {
				let bgColor = colorScale(algoColor, item2);
				let text = textColor(bgColor);
				return (
					<div
						key={"score_" + idx + "_" + idx2}
						style={{ width: score_width + "%" }}
						className="single-score"
					>
						<span
							className="score-span"
							style={{ backgroundColor: bgColor, color: text }}
						>
							{item2.toFixed(2)}
						</span>
					</div>
				);
			});
			return (
				<div key={"detailed_score_" + idx} className="row">
					{eachDetailedScore}
				</div>
			);
		});
		let publications = "";
		if (props.data.publication) {
			const publications_split = props.data.publication.split(",");
			publications = publications_split.map((item, idx) => {
				return (
					<a onClick={linkOnClick} target="_blank" href={item} key={"publication_" + idx}>
						{" "}
						({idx + 1})
					</a>
				);
			});
			publications = (
				<div className="algo-detail" key={`publication_${props.data.name}`}>
					Publications: {publications}
				</div>
			);
		}
		detailedInfo = [
			<div className="algo-detail" key={`submit_date_${props.data.name}`}>
				{props.data.submission_date.slice(0, 10)}
			</div>,
			publications,
		];
	}
	const unapprovedClass = props.data.is_accepted ? "" : " unapproved";
	const approveButton = props.data.is_accepted ? (
		""
	) : (
		<div className="admin-approve-container">
			<Button
				onClick={linkOnClick}
				className="admin-approve admin-approve-button"
				bsSize="xsmall"
				bsStyle="success"
			>
				Approve
			</Button>
			<br />
			<Button
				onClick={linkOnClick}
				className="admin-approve admin-reject-button"
				bsSize="xsmall"
				bsStyle="danger"
			>
				Reject
			</Button>
		</div>
	);
	return (
		<div>
			<div
				data-idx={props.index}
				className={"algorithm " + activeClass + unapprovedClass + privateClass}
				onClick={props.activate}
			>
				<div className="row">
					<div className="col-sm-3 algorithm-detail">
						<div className="algo-name">
							<a onClick={linkOnClick} target="_blank" href={props.data.repository}>
								{" "}
								<i className="algo-link glyphicon glyphicon-link" />
							</a>
							{props.data.name}
						</div>
						<div className="gh-name algo-detail">by {props.data.user_name}</div>
						{detailedInfo}
					</div>
					<div className="col-sm-9 scores">
						<div className="row">{scores}</div>
						<div className="detailed-scores">{detailedScores}</div>
					</div>
					{approveButton}
				</div>
			</div>
		</div>
	);
};

import React from "react";
import { linkOnClick } from "../utils/utils";
import { Button } from "react-bootstrap";
import { scaleLinear } from "d3-scale";

var colorize = scaleLinear()
	.domain([0, 1])
	.range(["rgb(85, 95, 115)", "rgb(110, 180, 255)"]);

export const Algorithm = props => {
	let scores = props.data.score_data.data.map((item, idx) => {
		return (
			<div key={"score_" + idx} style={{ width: "16.66%" }} className="single-score">
				<span className="score-span" style={{ backgroundColor: colorize(item) }}>
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
				return (
					<div
						key={"score_" + idx + "_" + idx2}
						style={{ width: "16.66%" }}
						className="single-score"
					>
						<span className="score-span" style={{ backgroundColor: colorize(item2) }}>
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
				{/*{props.data.submission_date.slice(0, 10)}*/}
			</div>,
			publications,
		];
	}
	// TODO fix problem where this triggers expanding the class
	const unapprovedClass = props.data.is_accepted ? "" : " unapproved";
	const approveButton = props.data.is_accepted ? (
		""
	) : (
		<div className="admin-approve-container">
			<Button className="admin-approve" bsSize="xsmall" bsStyle="info">
				Approve
			</Button>
			<Button className="admin-approve" bsSize="xsmall" bsStyle="warning">
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

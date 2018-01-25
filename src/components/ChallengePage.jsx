import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Tree } from "../containers/Tree.jsx";

export const About = props => {
	return (
		<div className="tab-content">
			<p>{props.content}</p>
		</div>
	);
};

export const SubmitModal = props => {
	return (
		<Modal show={props.isOpen} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>Successful Submission</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Thank you! Your submission is now in review. You will receive and e-mail when your
				entry is availble to view on the bakeoff site.
				<br />
				<Button bsStyle="info" onClick={props.close}>
					OK
				</Button>
			</Modal.Body>
		</Modal>
	);
};

export const Datasets = props => {
	const descriptions = props.datasets.map(dataset => {
		return (
			<p key={`description_${dataset.id}`}>
				<span className="dataset-name">{dataset.name}</span>: {dataset.description}
			</p>
		);
	});
	// Combine and flatten tree data
	const treeData = [].concat.apply(
		[],
		props.datasets.map(dataset => {
			return dataset.dataset_metadata;
		})
	);
	return (
		<div className="col-md-12 tab-content">
			<div>Available datasets:</div>
			<br />
			{descriptions}
			<Tree tree={treeData} />
			<br />
			<Button bsStyle="success">Download ({props.downloadsize})</Button>
		</div>
	);
};

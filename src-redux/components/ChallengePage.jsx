import React from "react";
import { Tree } from "../containers/Tree.jsx";
import { Modal, Button } from "react-bootstrap";

export const About = props => {
	return (
		<div className="col-md-12 tab-content">
			<p>
				Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas,
				egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida
				sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh.
				Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus
				porttitor odio, interdum vestibulum dolor mattis non.
			</p>
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
				<strong>{dataset.name}</strong>: {dataset.description}
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
	console.log(treeData);
	return (
		<div className="col-md-12 tab-content">
			<h4>Datasets</h4>
			{descriptions}
			<Tree tree={treeData} />
			<br />
			<Button bsStyle="success">Download ({props.downloadsize})</Button>
		</div>
	);
};

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Tree } from "../containers/Tree.jsx";

export const About = props => {
	return (
		<div style={{ borderColor: props.color }} className="tab-content">
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
				Thank you! Your submission is now in review. You will receive and e-mail when your entry is
				availble to view on the bakeoff site.
				<br />
				<Button
					style={{ borderColor: props.color, backgroundColor: props.color }}
					onClick={props.close}
				>
					OK
				</Button>
			</Modal.Body>
		</Modal>
	);
};

export const Datasets = props => {
	console.log(props);
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
		<div style={{ borderColor: props.color }} className="col-md-12 tab-content">
			<div>Available datasets:</div>
			<br />
			{descriptions}
			<Tree tree={treeData} />
			<br />
			<Button style={{ borderColor: props.color, backgroundColor: props.color }}>
				Download ({props.downloadsize})
			</Button>
		</div>
	);
};

export const FormErrorMessage = props => {
	return <div className="col-sm-12 submit-error">{props.errormessage}</div>;
};

export const LoaderGif = props => {
	let style = { height: "38px", paddingLeft: "10px" };
	style.display = props.display ? "inline" : "none";
	return <img style={style} alt="loading gif" src="/assets/img/Eclipse-1s-72px.gif" />;
};

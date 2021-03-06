import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Tree } from "./Tree.jsx";

export const About = (props) => {
  return (
    <div style={{ borderColor: props.color }} className="tab-content">
      <p dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  );
};

export const SubmitModal = (props) => {
  return (
    <Modal show={props.isOpen} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Successful Submission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Thank you! Your submission is now in review. Check back to see your
        submission when it is approved.
        <br />
        <Button
          style={{
            borderColor: props.challenge.color,
            backgroundColor: props.challenge.color,
          }}
          onClick={props.close}
        >
          OK
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export const Datasets = (props) => {
  let descriptions = "";
  let treeData = "";
  if (props.datasets) {
    descriptions = props.datasets.map((dataset) => {
      return (
        <p key={`description_${dataset.id}`}>
          <span className="dataset-name">{dataset.name}</span>:{" "}
          {dataset.description}
        </p>
      );
    });
    treeData = [].concat.apply(
      [],
      props.datasets.map((dataset) => {
        return dataset.tree;
      })
    );
  }
  // Combine and flatten tree data

  return (
    <div style={{ borderColor: props.color }} className="col-md-12 tab-content">
      <div>Available datasets:</div>
      <br />
      {descriptions}
      <Tree tree={treeData} />
      <br />
      <a href={props.data_path}>
        <Button
          style={{
            borderColor: props.color,
            backgroundColor: props.color,
          }}
        >
          Download ({props.downloadsize})
        </Button>
      </a>
    </div>
  );
};

export const FormErrorMessage = (props) => {
  return <div className="col-sm-12 submit-error">{props.errormessage}</div>;
};

export const LoaderGif = (props) => {
  let style = {
    height: "38px",
    paddingLeft: "10px",
  };
  style.display = props.display ? "inline" : "none";
  return (
    <img
      style={style}
      alt="loading gif"
      src="/assets/img/Eclipse-1s-72px.gif"
    />
  );
};

import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormErrorMessage, LoaderGif } from "./ChallengePage.jsx";

const validate = values => {
	/*
	submission
	repo
	results *
	publications
	institution
	private
	 */
	const errors = {};
	if (!values.submission) {
		errors.submission = "Submission Name is a required field";
	}
	if (!values.repo) {
		errors.repo = "Github Repo is required";
	} else if (values.repo.indexOf("github.com")) {
		errors.repo = "Github Repo must contain a valid link to a github repo.";
	}
	if (!values.results) {
		errors.results = "Results file is required";
	}
	return errors;
};

const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
	<div>
		<input {...input} className="form-control" type={type} />
		{touched && (error && <FormErrorMessage errormessage={error} />)}
	</div>
);

const adaptFileEventToValue = delegate => e => {
	delegate(e.target.files[0]);
};

const asyncValidate = (values /*, dispatch */) => {
	return readFile(values.results)
		.then(valid => {})
		.catch(error => {
			throw { results: error.error };
		});
};

const readFile = results_file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function(e) {
			let contents = e.target.result;
			const good_header = "\tcall\tp_doublet";
			let header = contents.substr(0, contents.indexOf("\n"));
			if (header !== "\tcall\tp_doublet") {
				reject({ error: `Bad header in file, should be ${good_header}` });
			} else {
				resolve({ valid: true, error: "" });
			}
		};
		reader.onerror = function(e) {
			reject({ error: "Error reading file" });
		};
		reader.readAsText(results_file);
	});
};
const FileInput = ({
	input: { value: omitValue, onChange, onBlur, ...inputProps },
	meta: { touched, error, warning },
	...props
}) => (
	<div>
		<input
			onChange={adaptFileEventToValue(onChange)}
			onBlur={adaptFileEventToValue(onBlur)}
			type="file"
			{...inputProps}
			{...props}
		/>
		{touched && (error && <FormErrorMessage errormessage={error} />)}
	</div>
);

const ChallengeForm = props => {
	const { error, handleSubmit, submitting } = props;
	return (
		<form onSubmit={handleSubmit} className="form-horizontal">
			<div className="form-group ">
				<label className="col-sm-4 control-label" htmlFor="submission">
					submission name *
				</label>
				<div className="col-sm-6">
					<Field
						id="submission"
						name="submission"
						component={renderField}
						className="form-control"
					/>
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-4 control-label" htmlFor="repo">
					github repo *
				</label>
				<div className="col-sm-6">
					<Field id="repo" name="repo" component={renderField} className="form-control" />
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-4 control-label" htmlFor="results">
					results file *
				</label>
				<div className="col-sm-6">
					<Field
						id="results"
						name="results"
						type="file"
						component={FileInput}
						// ref={input => (this.results = input)}
						className="form-control"
					/>
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-4 control-label" htmlFor="publications">
					link(s) to publications
				</label>
				<div className="col-sm-6">
					<Field
						id="publications"
						name="publications"
						component={renderField}
						className="form-control"
					/>
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-4 control-label" htmlFor="institution">
					institution
				</label>
				<div className="col-sm-6">
					<Field
						id="institution"
						name="institution"
						component={renderField}
						className="form-control"
					/>
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-4 control-label" htmlFor="private">
					keep private
				</label>
				<div className="col-sm-6">
					<Field id="private" name="private" component={renderField} type="checkbox" value="" />
				</div>
			</div>
			<div className="form-group">
				<div className="col-sm-offset-4 col-sm-6">
					<button
						style={{ borderColor: props.color, backgroundColor: props.color }}
						type="submit"
						disabled={submitting}
						className="btn"
					>
						Submit
					</button>
					<LoaderGif display={submitting} />
					<FormErrorMessage errormessage={error} />
				</div>
			</div>
		</form>
	);
};

export const ChallengeReduxForm = reduxForm({
	// a unique name for the form
	form: "resultssubmission",
	validate,
	asyncValidate,
	asyncBlurFields: ["results"],
})(ChallengeForm);

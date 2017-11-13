import React from "react";
import { Tabs } from "../components/Tabs.jsx";
import { About, SubmitModal, Datasets } from "../components/ChallengePage.jsx";
import { Algorithms } from "./AlgorithmContainer.jsx";

export class ChallengeTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.active,
		};
	}

	clickLink(e, data) {
		const activetab = e.target.getAttribute("data-tabname");
		this.setState({ active: activetab });
	}

	render() {
		let content = "";
		const data = [
			{
				algorithm: "Algorithm #1",
				ghname: "hca",
				ghlink: "https://github.com/chanzuckerberg/hca-bakeoff-site",
				data: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
				additionalData: [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
				dateSubmitted: new Date(2017, 8, 1),
				publications: ["https://chanzuckerberg.com/"],
				approved: true,
			},
			{
				algorithm: "B-Algorithm #2",
				ghname: "czi",
				ghlink: "https://github.com/chanzuckerberg/hca-bakeoff-site",
				data: [0.6, 0.5, 0.3, 0.4, 0.89, 0.3],
				additionalData: [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
				dateSubmitted: new Date(2017, 9, 1),
				publications: ["https://chanzuckerberg.com/", "https://chanzuckerberg.com/"],
				approved: true,
			},
			{
				algorithm: "Algorithm #3",
				ghname: "much longer name",
				ghlink: "https://github.com/chanzuckerberg/hca-bakeoff-site",
				data: [0.4, 0.11, 0.1, 0.99, 0.46, 0.32],
				additionalData: [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
				dateSubmitted: new Date(2017, 7, 1),
				approved: true,
			},
			{
				algorithm: "Unapproved Algorithm",
				ghname: "much longer name",
				ghlink: "https://github.com/chanzuckerberg/hca-bakeoff-site",
				data: [0.4, 0.11, 0.1, 0.99, 0.46, 0.32],
				additionalData: [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
				dateSubmitted: new Date(2017, 7, 1),
				approved: false,
			},
		];
		const treeData = [
			{ id: "doublet-datasets/dataset1", parent: "#", text: "dataset1" },
			{
				id: "doublet-datasets/dataset1/Ye2_L001_001.bam",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_001.bam (8G)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_L001_001_test.bam",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_001_test.bam (4G)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_L001_001_test_labels_predict_me.txt",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_001_test_labels_predict_me.txt (183K)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_L001_001_train.bam",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_001_train.bam (4G)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_L001_001_train_labels.txt",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_001_train_labels.txt (271K)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_L001_I1_001.fastq.gz",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_I1_001.fastq.gz (637M)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_L001_R1_001.fastq.gz",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_R1_001.fastq.gz (2G)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_L001_R2_001.fastq.gz",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_L001_R2_001.fastq.gz (8G)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_barcode_id.csv",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_barcode_id.csv (8M)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_gene_id.csv",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_gene_id.csv (409K)",
			},
			{
				id: "doublet-datasets/dataset1/Ye2_sparse_molecule_counts.mtx",
				parent: "doublet-datasets/dataset1",
				text: "Ye2_sparse_molecule_counts.mtx (278M)",
			},
			{ id: "doublet-datasets/dataset2", parent: "#", text: "dataset2" },
			{
				id: "doublet-datasets/dataset2/Ye032917_S4_L003_001.bam",
				parent: "doublet-datasets/dataset2",
				text: "Ye032917_S4_L003_001.bam (16G)",
			},
			{
				id: "doublet-datasets/dataset2/Ye032917_S4_L003_001_test.bam",
				parent: "doublet-datasets/dataset2",
				text: "Ye032917_S4_L003_001_test.bam (8G)",
			},
			{
				id: "doublet-datasets/dataset2/Ye032917_S4_L003_001_train.bam",
				parent: "doublet-datasets/dataset2",
				text: "Ye032917_S4_L003_001_train.bam (8G)",
			},
			{
				id: "doublet-datasets/dataset2/Ye032917_S4_L003_001_train_labels.txt",
				parent: "doublet-datasets/dataset2",
				text: "Ye032917_S4_L003_001_train_labels.txt (119K)",
			},
			{
				id: "doublet-datasets/dataset2/Ye032917_S4_L003_I1_001.fastq.gz",
				parent: "doublet-datasets/dataset2",
				text: "Ye032917_S4_L003_I1_001.fastq.gz (1G)",
			},
			{
				id: "doublet-datasets/dataset2/Ye032917_S4_L003_R1_001.fastq.gz",
				parent: "doublet-datasets/dataset2",
				text: "Ye032917_S4_L003_R1_001.fastq.gz (5G)",
			},
			{
				id: "doublet-datasets/dataset2/Ye032917_S4_L003_R2_001.fastq.gz",
				parent: "doublet-datasets/dataset2",
				text: "Ye032917_S4_L003_R2_001.fastq.gz (17G)",
			},
			{
				id: "doublet-datasets/dataset2/Ye3_barcode_id.csv",
				parent: "doublet-datasets/dataset2",
				text: "Ye3_barcode_id.csv (5M)",
			},
			{
				id: "doublet-datasets/dataset2/Ye3_gene_id.csv",
				parent: "doublet-datasets/dataset2",
				text: "Ye3_gene_id.csv (405K)",
			},
			{
				id: "doublet-datasets/dataset2/Ye3_sparse_molecule_counts.mtx",
				parent: "doublet-datasets/dataset2",
				text: "Ye3_sparse_molecule_counts.mtx (156M)",
			},
		];
		const dlSize = "83 GB";
		const scoreCategories = ["Score 1", "Score 2", "Score 3", "Score 4", "Score 5", "Score 6"];

		if (this.state.active === "about") {
			content = <About key="about" />;
		} else if (this.state.active === "datasets") {
			content = <Datasets key="dataset" tree={treeData} downloadsize={dlSize} />;
		} else if (this.state.active === "submit") {
			content = <SubmitChallenge key="submit" />;
		}
		content = [
			content,
			<Algorithms
				key="algorithms"
				isAdmin={this.props.isAdmin}
				data={data}
				categories={scoreCategories}
			/>,
		];

		return (
			<Tabs
				tabs={["about", "datasets", "submit"]}
				onclick={this.clickLink.bind(this)}
				activetab={this.state.active}
				content={content}
			/>
		);
	}
}

class SubmitChallenge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
		};
	}

	submitForm() {
		this.setState({ modalOpen: true });
	}

	closeModal() {
		this.setState({ modalOpen: false });
	}

	render() {
		const modalId = "submitModal";
		return (
			<div>
				<div className="col-md-12 tab-content">
					<p>
						<strong>Instructions:</strong> Etiam a diam nec orci porta mattis sit amet
						in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris.
						Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc
						scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum
						malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus
						porttitor odio, interdum vestibulum dolor mattis non.
					</p>
				</div>

				<form role="form" className="form-horizontal">
					<div className="form-group ">
						<label className="col-sm-4 control-label" htmlFor="submission">
							submission name *
						</label>
						<div className="col-sm-6">
							<input id="submission" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="repo">
							github repo *
						</label>
						<div className="col-sm-6">
							<input id="repo" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="results">
							results file *
						</label>
						<div className="col-sm-6">
							<input id="results" type="file" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="publications">
							link(s) to publications
						</label>
						<div className="col-sm-6">
							<input id="publications" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="institution">
							institution
						</label>
						<div className="col-sm-6">
							<input id="institution" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label" htmlFor="private">
							keep private
						</label>
						<div className="col-sm-6">
							<input id="private" type="checkbox" value="" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-4 col-sm-6">
							<button
								onClick={this.submitForm.bind(this)}
								type="button"
								className="btn btn-info"
							>
								Submit
							</button>
						</div>
					</div>
				</form>
				<SubmitModal
					isOpen={this.state.modalOpen}
					close={this.closeModal.bind(this)}
					id={modalId}
				/>
			</div>
		);
	}
}

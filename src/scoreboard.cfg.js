export const config = {
	general: {
		logo: [
			{
				name: "Chan Zuckerberg Initiative",
				filename: "CZ_LOGO_WHITE.svg",
				link: "https://chanzuckerberg.com/",
			},
			{
				name: "Human Cell Atlas",
				filename: "flogo.png",
				link: "https://www.humancellatlas.org/",
			},
		],
		title: "scoreboard",
		subtitle: "Human Cell Atlas",
		forum: "http://discoursejam.czi.technology",
		about:
			"Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
		faq: [
			{
				question: "What is a challenge?",
				answer:
					"Mauris ac lectus ipsum. Sed malesuada velit ut euismod ultrices. Quisque aliquet feugiat " +
					"arcu, ut rhoncus magna ornare at. Nullam consequat nec enim vel bibendum. Duis id sem " +
					"sed turpis mattis pharetra. Cras ultricies risus at mattis lobortis. Maecenas sodales " +
					"ipsum sit amet semper commodo. Cras sagittis gravida dui, sed convallis metus semper " +
					"vel.",
			},
			{
				question: "Why do I need to use git to submit?",
				answer:
					"Phasellus aliquet volutpat magna eu sodales. Donec et urna eget ipsum mollis euismod." +
					"Nulla laoreet magna at varius congue. Phasellus nec enim sed ante tempus sagittis." +
					"Integer feugiat rhoncus justo, ut sodales tellus. Vivamus feugiat porttitor ligula, sed" +
					"lacinia diam iaculis vitae. Nulla a nulla pharetra, pharetra mauris id, molestie odio." +
					"Morbi sapien libero, porttitor vitae enim vel, placerat elementum dui. Aenean tristique" +
					"nulla ante, et vulputate orci pulvinar ut. Sed posuere quis massa eget mattis. Mauris" +
					"eget justo nunc. Nulla in interdum felis. Nunc aliquet auctor vulputate. Phasellus" +
					"accumsan porttitor massa, et tincidunt leo varius eu. Nunc ligula ligula, auctor at" +
					"tortor vel, vulputate tincidunt diam.",
			},
			{
				question: "Do I need to be a member of a university?",
				answer:
					"Mauris vel venenatis arcu. Cras tincidunt magna sit amet egestas molestie. Duis" +
					"tincidunt urna a augue tincidunt, quis tempor velit placerat. Vestibulum placerat tempus" +
					"enim et condimentum. Phasellus quis mauris dapibus, dignissim metus a, dignissim elit." +
					"Cras gravida, lacus non ultrices varius, justo leo volutpat orci, vitae tempor libero" +
					"nisi eget odio. Aenean eu pharetra augue, eu porttitor justo. Sed sollicitudin libero" +
					"eget elit cursus, in hendrerit lorem viverra. In porttitor nisi eu mattis viverra.",
			},
			{
				question: "How do I get in touch?",
				answer:
					"Join the conversation on our" +
					"<a href='http://discoursejam.czi.technology'> forum</a>." +
					" Ask questions and read through discussion.",
			},
		],
	},
	challenges: {
		"doublet detection": {
			color: "#AD3E97",
			about:
				"Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
			description: "This is detecting doublets",
			image: "http://via.placeholder.com/100/AD3E97",
			scores: [
				"True Negative",
				"False Negative",
				"False Positive",
				"True Positive",
				"True Positive Rate",
				"True Negative Rate",
			],
			datasetdownloadsize: "83 GB",
			datasets: [
				{
					name: "Dataset 1",
					description: "Bams and fastqs from Ye2",
					tree: [
						{
							id: "doublet-datasets/dataset1",
							text: "dataset1",
							parent: "#",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_001.bam",
							text: "Ye2_L001_001.bam (8G)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_001_test.bam",
							text: "Ye2_L001_001_test.bam (4G)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_001_test_labels_predict_me.txt",
							text: "Ye2_L001_001_test_labels_predict_me.txt (183K)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_001_train.bam",
							text: "Ye2_L001_001_train.bam (4G)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_001_train_labels.txt",
							text: "Ye2_L001_001_train_labels.txt (271K)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_I1_001.fastq.gz",
							text: "Ye2_L001_I1_001.fastq.gz (637M)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_R1_001.fastq.gz",
							text: "Ye2_L001_R1_001.fastq.gz (2G)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_L001_R2_001.fastq.gz",
							text: "Ye2_L001_R2_001.fastq.gz (8G)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_barcode_id.csv",
							text: "Ye2_barcode_id.csv (8M)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_gene_id.csv",
							text: "Ye2_gene_id.csv (409K)",
							parent: "doublet-datasets/dataset1",
						},
						{
							id: "doublet-datasets/dataset1/Ye2_sparse_molecule_counts.mtx",
							text: "Ye2_sparse_molecule_counts.mtx (278M)",
							parent: "doublet-datasets/dataset1",
						},
					],
				},
				{
					name: "Dataset 2",
					description: "Bams and fastqs from Ye032917",
					tree: [
						{ id: "doublet-datasets/dataset2", text: "dataset2", parent: "#" },
						{
							id: "doublet-datasets/dataset2/Ye032917_S4_L003_001.bam",
							text: "Ye032917_S4_L003_001.bam (16G)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye032917_S4_L003_001_test.bam",
							text: "Ye032917_S4_L003_001_test.bam (8G)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye032917_S4_L003_001_train.bam",
							text: "Ye032917_S4_L003_001_train.bam (8G)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye032917_S4_L003_001_train_labels.txt",
							text: "Ye032917_S4_L003_001_train_labels.txt (119K)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye032917_S4_L003_I1_001.fastq.gz",
							text: "Ye032917_S4_L003_I1_001.fastq.gz (1G)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye032917_S4_L003_R1_001.fastq.gz",
							text: "Ye032917_S4_L003_R1_001.fastq.gz (5G)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye032917_S4_L003_R2_001.fastq.gz",
							text: "Ye032917_S4_L003_R2_001.fastq.gz (17G)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye3_barcode_id.csv",
							text: "Ye3_barcode_id.csv (5M)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye3_gene_id.csv",
							text: "Ye3_gene_id.csv (405K)",
							parent: "doublet-datasets/dataset2",
						},
						{
							id: "doublet-datasets/dataset2/Ye3_sparse_molecule_counts.mtx",
							text: "Ye3_sparse_molecule_counts.mtx (156M)",
							parent: "doublet-datasets/dataset2",
						},
					],
				},
			],
		},
		"cell identification": {
			color: "#BAB942",
			about:
				"B: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
			description: "This is cell identification",
			image: "http://via.placeholder.com/100/BAB942",
		},
		"batch effect correction": {
			color: "#3C57C4",
			about:
				"C: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
			description: "This is batch effect correction",
			image: "http://via.placeholder.com/100/3C57C4",
		},
		"experimental design": {
			color: "#C47C3C",
			about:
				"D: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
			description: "This is designing experiments",
			image: "http://via.placeholder.com/100/C47C3C",
		},
		"cell type clustering": {
			color: "#39BA79",
			about:
				"E: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
			description: "This is clustering cell types",
			image: "http://via.placeholder.com/100/39BA79",
		},
	},
};

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
				"A: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
		},
		"cell identification": {
			color: "#BAB942",
			about:
				"B: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
		},
		"batch effect correction": {
			color: "#3C57C4",
			about:
				"C: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
		},
		"experimental design": {
			color: "#C47C3C",
			about:
				"D: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
		},
		"cell type clustering": {
			color: "#39BA79",
			about:
				"E: Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.",
			examplefile:
				"https://s3.amazonaws.com/hca-hinxton-jamboree/doublets-test/counts/test_chr21.dge.summary.txt",
		},
	},
};

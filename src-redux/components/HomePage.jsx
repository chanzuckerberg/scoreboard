import React from "react";
// import { slugify } from "../utils/utils";

export const About = () => (
	<div className="col-md-12 tab-content">
		<p>
			Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas,
			egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien
			sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum
			malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor
			odio, interdum vestibulum dolor mattis non.
		</p>
	</div>
);

export const Challenges = props => {
	console.log(props);
	const challenges = props.challenges.map(item => {
		return (
			<Challenge
				name={item.name}
				key={"Challenge_" + item.id}
				datasetcount={item.datasets}
				submissions={item.submissions}
				image={item.image_path}
				description={item.description}
			/>
		);
	});
	return <div>{challenges}</div>;
};

export const Challenge = props => (
	// Todo put link back in
	// const routeId = slugify(props.name);
	<div className="col-md-4 challenge">
		<img className="pull-left dataset-img" src={props.image} alt="placeholder" />
		<div>
			<h4>{props.name}</h4>
			<div>{props.description}</div>
			<div>datasets: {props.datasetcount}</div>
			<div>submissions: {props.submissions}</div>
		</div>
	</div>
);

export const SlackHelp = () => (
	<div className="col-md-12 tab-content">
		The best way to get help is to join our slack channel. Ask questions and read through
		discussion.
	</div>
);

export const FAQ = () => (
	<div className="col-md-12">
		<p className="question">What is a challenge?</p>
		<p className="answer">
			Mauris ac lectus ipsum. Sed malesuada velit ut euismod ultrices. Quisque aliquet feugiat
			arcu, ut rhoncus magna ornare at. Nullam consequat nec enim vel bibendum. Duis id sem
			sed turpis mattis pharetra. Cras ultricies risus at mattis lobortis. Maecenas sodales
			ipsum sit amet semper commodo. Cras sagittis gravida dui, sed convallis metus semper
			vel.
		</p>
		<p className="question">Why do I need to use git to submit?</p>
		<p className="answer">
			Phasellus aliquet volutpat magna eu sodales. Donec et urna eget ipsum mollis euismod.
			Nulla laoreet magna at varius congue. Phasellus nec enim sed ante tempus sagittis.
			Integer feugiat rhoncus justo, ut sodales tellus. Vivamus feugiat porttitor ligula, sed
			lacinia diam iaculis vitae. Nulla a nulla pharetra, pharetra mauris id, molestie odio.
			Morbi sapien libero, porttitor vitae enim vel, placerat elementum dui. Aenean tristique
			nulla ante, et vulputate orci pulvinar ut. Sed posuere quis massa eget mattis. Mauris
			eget justo nunc. Nulla in interdum felis. Nunc aliquet auctor vulputate. Phasellus
			accumsan porttitor massa, et tincidunt leo varius eu. Nunc ligula ligula, auctor at
			tortor vel, vulputate tincidunt diam.
		</p>
		<p className="question">Do I need to be a member of a university?</p>
		<p className="answer">
			Mauris vel venenatis arcu. Cras tincidunt magna sit amet egestas molestie. Duis
			tincidunt urna a augue tincidunt, quis tempor velit placerat. Vestibulum placerat tempus
			enim et condimentum. Phasellus quis mauris dapibus, dignissim metus a, dignissim elit.
			Cras gravida, lacus non ultrices varius, justo leo volutpat orci, vitae tempor libero
			nisi eget odio. Aenean eu pharetra augue, eu porttitor justo. Sed sollicitudin libero
			eget elit cursus, in hendrerit lorem viverra. In porttitor nisi eu mattis viverra.
		</p>
	</div>
);

export const Tabs = props => {
	const tablinks = props.tabs.map((tabname, idx) => {
		let tabclass = "col-md-2 tab clickable ";
		if (tabname === props.activetab) tabclass += "tab-selected";
		return (
			<div
				key={`my_tab_link_${idx}`}
				className={tabclass}
				data-tabname={tabname}
				onClick={props.onclick}
			>
				{tabname} //
			</div>
		);
	});
	return (
		<div>
			<div className="row">{tablinks}</div>
			{props.content}
		</div>
	);
};

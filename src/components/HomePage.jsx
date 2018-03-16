import React from "react";
import { Link } from "react-router-dom";
import { config } from "../scoreboard.cfg.js";

export const About = () => (
	<div className="col-md-8 col-md-offset-2 about">
		<p>{config.general.about}</p>
	</div>
);

export const Challenges = props => {
	const challenges = props.challenges.map(item => {
		const lowername = item.name.toLowerCase();
		const color = config.challenges[lowername].color;
		return (
			<Challenge
				name={item.name}
				color={color}
				key={"Challenge_" + item.id}
				challengeid={item.id}
				datasetcount={item.datasets}
				submissions={item.submissions}
				image={item.image_path}
				description={item.description}
			/>
		);
	});
	return <div className="col-md-10 col-md-offset-1">{challenges}</div>;
};

export const Challenge = props => {
	const style = {
		borderColor: props.color,
		borderWidth: "3px",
		borderStyle: "solid",
	};
	return (
		<div className="col-md-4 challenge">
			<Link to={`/challenge/${props.challengeid}`}>
				<div className="challenge-box" style={style}>
					<img className="pull-left challenge-img" src={props.image} alt="placeholder" />
					<div className="challenge-info">
						<div className="challenge-name">{props.name}</div>
						<div className="challenge-detail">{props.description}</div>
						<div className="challenge-detail">datasets: {props.datasetcount}</div>
						<div className="challenge-detail">submissions: {props.submissions}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const FAQ = () => (
	<div className="col-md-8 col-md-offset-2 faq">
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
		<p className="question">How do I get in touch?</p>
		<p className="answer">
			Join the conversation on our{" "}
			<a className="discourse-link" href={config.general.forum}>
				forum
			</a>. Ask questions and read through discussion.
		</p>
	</div>
);

import React from "react";
import { Link } from "react-router-dom";
import { config } from "../scoreboard.cfg.js";
import { slugify } from "../utils/utils";

export const About = () => (
	<div className="col-md-8 col-md-offset-2 about">
		<p>{config.general.about}</p>
	</div>
);

export const Challenges = props => {
	const challenges = props.challenges.map(item => {
		return (
			<Challenge
				name={item.name}
				key={"Challenge_" + item.id}
				challengeid={item.id}
				datasetcount={item.datasets}
				submissions={item.submissions}
				image={item.image}
				color={item.color}
				description={item.description}
			/>
		);
	});
	let low_challenge_message = "";
	const style = {
		borderColor: "rgb(150,150,150)",
		borderWidth: "3px",
		borderStyle: "solid",
	};
	if (props.challenges.length <= 1) {
		low_challenge_message = (
			<div className="col-md-4 challenge">
				<div className="challenge-box" style={style}>
					<div className="challenge-info">
						<div className="challenge-name">More challenges are on their way.</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="col-md-10 col-md-offset-1">
			{challenges}
			{low_challenge_message}
		</div>
	);
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

export const FAQ = () => {
	const qanda = config.general.faq.map(item => {
		return (
			<div key={slugify(item.question)}>
				<p className="question">{item.question}</p>
				<p className="answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
			</div>
		);
	});
	return <div className="col-md-8 col-md-offset-2 faq">{qanda}</div>;
};

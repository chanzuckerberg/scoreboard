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
		const lowername = item.name.toLowerCase();
		let color = "#aaaaaa";
		let datasets = 0;
		let image = "";
		let description = "";

		if ("color" in config.challenges[lowername]) color = config.challenges[lowername].color;
		if ("datasets" in config.challenges[lowername])
			datasets = config.challenges[lowername].datasets.length;
		if ("image" in config.challenges[lowername]) image = config.challenges[lowername].image;
		if ("description" in config.challenges[lowername])
			description = config.challenges[lowername].description;
		return (
			<Challenge
				name={item.name}
				color={color}
				key={"Challenge_" + item.id}
				challengeid={item.id}
				datasetcount={datasets}
				submissions={item.submissions}
				image={image}
				description={description}
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

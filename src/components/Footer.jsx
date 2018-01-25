import React from "react";
import { config } from "../scoreboard.cfg.js";

export const Footer = () => {
	const logos = config.general.logo.map(logo => {
		return (
			<a key={"logo" + logo.name} href={logo.link}>
				<img alt={logo.name} className="logo-link" src={"/assets/img/" + logo.filename} />
			</a>
		);
	});
	return (
		<div className="row">
			<footer className="footer">
				<div>{logos}</div>
				<div className="footer-built">
					Built with{" "}
					<a
						className="clickable underline"
						href="https://github.com/chanzuckerberg/scoreboard"
						target="_window"
					>
						scoreboard
					</a>
				</div>
			</footer>
		</div>
	);
};

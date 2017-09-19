import React from "react";

export const Footer = props => {
	return (
		<div className="row">
			<footer className="footer">
				<div className="pull-left">
					<a href="https://chanzuckerberg.com/">
						<img
							alt="Chan Zuckerberg Initiative"
							className="logo-link"
							src="/assets/img/CZ_LOGO_WHITE.svg"
						/>
					</a>
					<a href="https://www.humancellatlas.org/">
						<img alt="Human Cell Atlas" className="logo-link" src="/assets/img/flogo.png" />
					</a>
				</div>
				<div className="pull-right center-text">© 2017 Chan Zuckerberg Initiative</div>
			</footer>
		</div>
	);
};

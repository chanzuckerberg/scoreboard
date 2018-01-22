import React from "react";

export const Footer = () => {
	return (
		<div className="row">
			<footer className="footer">
				<div>
					<a href="https://chanzuckerberg.com/">
						<img
							alt="Chan Zuckerberg Initiative"
							className="logo-link"
							src="/assets/img/CZ_LOGO_WHITE.svg"
						/>
					</a>
					<a href="https://www.humancellatlas.org/">
						<img
							alt="Human Cell Atlas"
							className="logo-link"
							src="/assets/img/flogo.png"
						/>
					</a>
				</div>
			</footer>
		</div>
	);
};

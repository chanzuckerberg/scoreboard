import React from 'react';

export const Header = (props) => {
	return (
		<div className="row">
		<header>
			<div className="pull-left">
				<h1>analysis scoreboard</h1>
				<h3>Human Cell Atlas</h3>
			</div>
			<div className="pull-right" id="login-section"><span>login >></span></div>
		</header>
		</div>
	)
}
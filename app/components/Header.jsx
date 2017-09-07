import React from 'react';
import {Link} from 'react-router-dom'

export const Header = (props) => {
	return (
		<div className="row">
		<header>
			<div className="pull-left title">
				<Link to="/">
				<h1>{props.title}</h1>
				</Link>
				<h3>{props.subtitle}</h3>
			</div>
			<div className="pull-right clickable" id="login-section"><span>login >></span></div>
		</header>
		</div>
	)
}
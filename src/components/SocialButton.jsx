import React, { Component } from "react";
import SocialLogin from "react-social-login";

class Button extends Component {
	render() {
		const { children, triggerLogin, triggerLogout, ...props } = this.props;
		return (
			<span className="clickable" onClick={triggerLogin} {...props}>
				{children}
			</span>
		);
	}
}

export default SocialLogin(Button);

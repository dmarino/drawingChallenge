import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Login.css";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

class Login extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="Login">
				<nav className="navbar fixed-top navbar-light bg-light">
				  <a className="navbar-brand" href="#">Drawing Challenge</a>
				  <div id="derecha">
				  	<AccountsUIWrapper></AccountsUIWrapper>
				  </div>
				</nav>
			</div>);
	}
}

Login.PropTypes={
};

export default Login;
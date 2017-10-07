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
				<AccountsUIWrapper></AccountsUIWrapper>
			</div>
		);
	}
}

Login.PropTypes={
};

export default Login;
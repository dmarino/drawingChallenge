import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Login.css";

class Login extends Component{
	constructor(props){
		super(props);
		this.onClick=this.onClick.bind(this);
	}

	onClick(){
		this.props.onClick(this.input.value);
	}

	render(){
		return (
			<div className="Login">
			<input type="text" 
				placeholder="enter user name"
				ref={(input)=>this.input = input}/>
			<button onClick={this.onClick}> Agregar usuario</button>
			</div>);
	}
}

Login.PropTypes={
	onClick: PropTypes.func.isRequired
};

export default Login;
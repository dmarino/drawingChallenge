import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Login.css";

class Login extends Component{
	constructor(props){
		super(props);
		this.onClick=this.onClick.bind(this);
	}

	onClick(evt){
		if(evt.key === "Enter")
			this.props.onClick(this.input.value);
	}

	render(){
		return (
			<div className="Login">

				<nav className="navbar fixed-top navbar-light bg-light">
				  <a className="navbar-brand" href="#">Drawing Challenge</a>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className="collapse navbar-collapse" id="navbarText">
				    <ul className="navbar-nav mr-auto">
				      <li className="nav-item active">
				        <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
				      </li>
				      <li className="nav-item active">
				        <a className="nav-link" href="#">Iniciar Sesion</a>
				      </li>
				      <li className="nav-item">
				        <a className="nav-link" href="#">Nosotros</a>
				      </li>
					    <li>
						<input type="text" 
							placeholder="Enter username"
							ref={(input)=>this.input = input}
							onKeyPress={this.onClick}/></li>
				    </ul>
				  </div>
				</nav>
			</div>);
	}
}

Login.PropTypes={
	onClick: PropTypes.func.isRequired
};

export default Login;
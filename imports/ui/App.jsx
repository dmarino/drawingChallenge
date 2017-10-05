import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";

import Login from "./Login.jsx";
import Principal from "./Principal.jsx";
import Dibujo from "./Dibujo.jsx";

import {Usuarios} from "../api/usuarios.js";
import {Concurso} from "../api/concurso.js";

class App extends Component{
	constructor(props){
		super(props);

		this.usuario = this.usuario.bind(this);
		this.state={
			currentUser:{}
		};
	}

	usuario(nombre){
		this.setState({
			currentUser:nombre
		});
	}

	render(){
		return (
			<div className="App">
			<Login onClick = {this.usuario}></Login>
			{this.state.currentUser===null ? 
				<Principal></Principal>:
				<Dibujo></Dibujo>
			}
			</div>);
	}
}

App.PropTypes={

};

export default createContainer(()=>{
	return{
		Concurso: Concurso.find({}).fetch()
	};
},App);
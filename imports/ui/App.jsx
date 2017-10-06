import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import "./Styles/App.css";
import Login from "./Login.jsx";
import Principal from "./Principal.jsx";
import Dibujo from "./Dibujo.jsx";
import Menu_lateral from "./Menu_lateral.jsx";

import {Usuarios} from "../api/usuarios.js";
import {Concurso} from "../api/concurso.js";

class App extends Component{
	constructor(props){
		super(props);

		this.usuario = this.usuario.bind(this);
		this.state={
			currentUser:null,
			dibujando:false,
			misDibujos:[]
		};
	}

	usuario(nombre){
		console.log(nombre);
		this.setState({
			currentUser:nombre,
			dibujando:false
		});
	}
	participar(){
//		var dibujar = this.state.dibujando;
//		dibujar = !dibujar;
		this.setState({
			misDibujos:[],
			dibujando:true
		});
	}

	verConcursoDia(){
		console.log(":D");
		this.setState({
			dibujando:false,
			misDibujos:[]
		});
	}

	verDibujos(){
		//Concurso.find({"dibujos.autor":currentUser},{_id:0, "dibujos.$":1});
		//buscar mis propios dibujos por usuario
		this.setState({
			dibujando:false,
			misDibujos:[{dibujo:"holi", autor:"yo"}, {dibujo:"jeje", autor:"yo"}]
		})
	}

	cerrarSesion(){
		this.setState({
			dibujando:false,
			currentUser:null,
			misDibujos:[]
		});
	}
	render(){
		return (
			<div className="App">
				<Login onClick = {this.usuario} user={this.state.currentUser}></Login>
				<div className="espacio"></div>
				<Menu_lateral concursos={this.props.Concurso} user={this.state.currentUser}
					participar={this.participar.bind(this)}
					verDibujos={this.verDibujos.bind(this)}
					cerrarSesion={this.cerrarSesion.bind(this)}
					verConcursoDia={this.verConcursoDia.bind(this)}></Menu_lateral>
				{!this.state.dibujando ? 
					<Principal concursos={this.props.Concurso} misDibujos={this.state.misDibujos}
								></Principal>:
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
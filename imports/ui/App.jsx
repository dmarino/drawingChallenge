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
import {Dibujos} from "../api/dibujos.js";

class App extends Component{
	constructor(props){
		super(props);

		this.usuario = this.usuario.bind(this);
		this.state={
			currentUser:null,
			currentDibujo:{},
			dibujando:false,
			misDibujosActivos:false,
			antConcurso:[],
			misDibujos:[]
		};
	}

	usuario(nombre){
		console.log(nombre);
		this.setState({
			currentUser:nombre,
			currentConcurso:this.props.concursos[0],
			dibujando:false
		});
	}

	participar(){

		var dibujar = this.state.dibujando;
		dibujar = !dibujar;

		var dibujo = Dibujos.find({"concurso":this.state.currentConcurso.nombre,"autor":this.state.currentUser}).fetch()[0];
		if(!dibujo){
		    Dibujos.insert({
		        autor: this.state.currentUser, 
		        concurso: this.state.currentConcurso.nombre,
		        editado: new Date(),
		        likes : 0,
		        dibujo:[]
		    });
		    dibujo = Dibujos.find({"concurso":this.state.currentConcurso.nombre,"autor":this.state.currentUser}).fetch()[0];
		}

		this.setState({
		    dibujando:dibujar,
		    currentDibujo: dibujo,
		    misDibujosActivos:false,
		    antConcurso:[],
			misDibujos:[]		
        });
	}

	verConcursoDia(){
		this.setState({
			dibujando:false,
			misDibujosActivos:false,
			antConcurso:[],
			misDibujos:[]
		});
	}

	verConcurso(nombre){
		var concursoAnterior = Dibujos.find({"concurso":nombre}).fetch();
		this.setState({
			antConcurso:concursoAnterior,
			dibujando:false,
			misDibujosActivos:false,
			misDibujos:[]
		});
	}

	verDibujos(){
		var dibujos = Dibujos.find({"autor":this.state.currentUser}).fetch();
		this.setState({
			dibujando:false,
			misDibujosActivos:true,
			antConcurso:[],
			misDibujos:dibujos
		})
	}

	cerrarSesion(){
		this.setState({
			currentUser:null,
			currentDibujo:{},
			dibujando:false,
			misDibujosActivos:false,
			antConcurso:[],
			misDibujos:[]
		});
	}

	render(){
		var dibujos;
		if(this.props.concursos.length!==0){
			dibujos = Dibujos.find({concurso:this.props.concursos[0].nombre}).fetch();
		}
		return (
			<div className="App">
				<Login onClick = {this.usuario} user={this.state.currentUser}></Login>
				<div className="espacio"></div>
				<Menu_lateral concursos={this.props.concursos} user={this.state.currentUser}
					participar={this.participar.bind(this)}
					verDibujos={this.verDibujos.bind(this)}
					cerrarSesion={this.cerrarSesion.bind(this)}
					verConcursoDia={this.verConcursoDia.bind(this)}
					verConcurso={this.verConcurso.bind(this)}></Menu_lateral>
				{!this.state.dibujando ? 
					<Principal concursos={this.props.concursos} misDibujos={this.state.misDibujos}
								misDibujosActivos={this.state.misDibujosActivos}
									dibujos = {dibujos}
									anteriorConcurso = {this.state.antConcurso}></Principal>:
					<Dibujo dibujo={this.state.currentDibujo}></Dibujo>
				}
			</div>);
	}
}

App.PropTypes={
    concursos: PropTypes.array.isRequired,
    usuarios: PropTypes.array.isRequired,
};

export default createContainer(()=>{
	return{
		concursos: Concurso.find({}, { sort: { fecha: -1 } }).fetch(),
		usuarios: Usuarios.find({}).fetch(),
		concursoDia: Concurso.find().fetch()
	};
},App);
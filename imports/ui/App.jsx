import React, {Component} from "react";
import PropTypes from "prop-types";

import {createContainer} from "meteor/react-meteor-data";

import "./Styles/App.css";
import Login from "./Login.jsx";
import Principal from "./Principal.jsx";
import Dibujo from "./Dibujo.jsx";
import { Meteor } from 'meteor/meteor';
import Menu_lateral from "./Menu_lateral.jsx";

import {Usuarios} from "../api/usuarios.js";
import {Concurso} from "../api/concurso.js";
import {Dibujos} from "../api/dibujos.js";

class App extends Component{
	constructor(props){
		super(props);

		this.state={
			currentDibujo:{},
			currentConcurso:{},
			dibujando:false,
			misDibujosActivos:false,
			antConcurso:false,
			misDibujos:[],
			loged:false
		};
	}

	componentWillUpdate(newProps){
		if(newProps.concursos[0] !== this.state.currentConcurso){
			this.setState({
				currentConcurso:this.props.concursos[0]
			});
		}
		if(newProps.currentUser !== null && newProps.currentUser !== undefined && this.state.loged === false){
			this.setState({loged : true});
			this.cerrarSesion();
		}
		else if((newProps.currentUser === null || newProps.currentUser === undefined) && this.state.loged !== false){
			this.setState({loged : false});
			this.cerrarSesion();
		}
	}

	participar(){

		var dibujar = this.state.dibujando;
		dibujar = !dibujar;

		var dibujo = Dibujos.find({"concurso":this.state.currentConcurso.nombre,"autor":Meteor.user().profile.name}).fetch()[0];
		if(!dibujo){
		    Dibujos.insert({
		        autor: Meteor.user().profile.name, 
		        concurso: this.state.currentConcurso.nombre,
		        editado: new Date(),
		        likes : 0,
		        dibujo:[]
		    });
		    dibujo = Dibujos.find({"concurso":this.state.currentConcurso.nombre,"autor":Meteor.user().profile.name}).fetch()[0];
		}

		this.setState({
		    dibujando:dibujar,
		    currentDibujo: dibujo,
		    misDibujosActivos:false,
		    antConcurso:false,
			misDibujos:[]		
        });
	}

	verConcursoDia(){
		this.setState({
			dibujando:false,
			misDibujosActivos:false,
			antConcurso:false,
			misDibujos:[]
		});
	}

	verAnterior(){
		this.setState({
			dibujando:false,
			misDibujosActivos:false,
			misDibujos:[],
			antConcurso:true			
		});
	}

	verDibujos(){
		var dibujos = Dibujos.find({"autor":Meteor.user().profile.name}).fetch();
		this.setState({
			dibujando:false,
			misDibujosActivos:true,
			antConcurso:[],
			antConcurso:false,
			misDibujos:dibujos
		})
	}

	cerrarSesion(){
		this.setState({
			currentDibujo:{},
			dibujando:false,
			misDibujosActivos:false,
			antConcurso:false,
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
				<Login></Login>
				<div id="banner">
				    <img src="./images/banner.png"/>
			    </div>
			    <Menu_lateral 
				    concursos={this.props.concursos} 
				    user={this.props.currentUser}
				    verDibujos={this.verDibujos.bind(this)}
				    verConcursoDia={this.verConcursoDia.bind(this)}
				    verAnterior={this.verAnterior.bind(this)}
				>
			    </Menu_lateral>
				{!this.state.dibujando ? 
				    <div>
					    <Principal 
					        concursos={this.props.concursos} 
				            user={this.props.currentUser}					        
					        misDibujos={this.state.misDibujos}
						    misDibujosActivos={this.state.misDibujosActivos}
							dibujos = {dibujos}
							anteriorConcurso = {this.state.antConcurso}
							participar = {this.participar.bind(this)}
						>							
						</Principal>			         	
				    </div>
					:
			        <Dibujo 
					    dibujo={this.state.currentDibujo}>
				    </Dibujo>
				}				
			</div>);
	}
}

App.PropTypes={
    concursos: PropTypes.array.isRequired,
    usuarios: PropTypes.array.isRequired,
    concursoDia: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(()=>{
	return{
		concursos: Concurso.find({}, { sort: { fecha: -1 } }).fetch(),
		usuarios: Usuarios.find({}).fetch(),
		concursoDia: Concurso.find().fetch(),
		currentUser: Meteor.user()
	};
},App);
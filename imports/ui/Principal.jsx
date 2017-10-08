import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Principal.css";
import CanvasT from "./CanvasT.jsx";

import {Dibujos} from "../api/dibujos.js";

class Principal extends Component{
	constructor(props){
		super(props);

		this.state={
		    concursoActual:null,
		    dibujosConcurso:[]
		};
	}

	participar(){
		this.props.participar();
	}	

	componentWillUpdate(){
		if(this.props.concursos !== null && this.props.concursos !== undefined && this.props.concursos.length!==0){
			var tempo = this.props.concursos[1];
		    var tempoDibujos = Dibujos.find({"concurso":tempo.nombre}).fetch();
		    if(this.state.concursoActual !== tempo){
			    this.setState({
			        concursoActual: tempo,
			        dibujosConcurso:tempoDibujos
			    });
			}
		}
	}

	handleChange = (event) =>{
		var indice = event.target.value;
		indice = parseInt(indice);
		indice += 1;
	    var tempo = this.props.concursos[indice];
	    var tempoDibujos = Dibujos.find({"concurso":tempo.nombre}).fetch();

	    this.setState({
	        concursoActual: tempo,
	        dibujosConcurso:tempoDibujos
	    });
	}

	content(){
		var concursos = this.props.concursos;
		var rta;
		if(this.props.misDibujosActivos){
			rta = "No tiene dibujos para mostrar";
		}
		else{
			if(this.props.anteriorConcurso){
				rta = "Anterior Concurso";
			}
			else if(concursos.length===0)
				rta="No existen concursos para mostrar";
			else{
				concurso = concursos[0];
				rta = "concurso";
			}
		}
		if(rta === "Anterior Concurso"){
			concursos = concursos.slice(0);
			concursos.shift();
			return (
				<div>
				    <select onChange={this.handleChange}>
					    {concursos.map((p,i)=>{
						    return <option key={i} value={i}> {p.nombre}</option>;
					    })}				        
				    </select>
				    {this.state.concursoActual!==null && this.state.concursoActual !== undefined ?
				        <div>
						    <h1>{this.state.concursoActual.nombre}</h1>
						    {this.state.dibujosConcurso.length !== 0 ?
						        <div>
					                {this.state.dibujosConcurso.map((p,i)=>{
						                return <CanvasT dibujo={p} key={i} tema={false} like={false}></CanvasT>;
					                })}	
					            </div>				        
						    :
						        null
						    }			        
				        </div>				    
					:
					    null
					}
				</div>
			);
		}
		else if(rta!=="concurso"){
			return rta;
		}
		else{
			return (
				<div>
					<h1>{concurso.nombre}</h1>
					{this.props.user?
					    <div><button onClick={()=>this.participar()}>Participar</button></div>
					:
					    null
					}
					{this.props.dibujos.map((p,i)=>{
						return <CanvasT dibujo={p} key={i} tema={false} like={true}></CanvasT>;
					})}
				</div>
			);
		}
	}

	render(){
		return (
			<div className="Principal">
				<div>
				   {this.props.misDibujos.length!==0 ? 
					    this.props.misDibujos.map((p,i)=>{
						    return <CanvasT dibujo={p} key={i} tema={true} tema={false}></CanvasT>;
					    }) 
				   : 
				        this.content()
				   }
				</div>
			</div>
		);
	}
}

Principal.PropTypes={
	concursos: PropTypes.object.isRequired
};

export default Principal;
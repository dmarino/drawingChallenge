import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Principal.css";
import CanvasT from "./CanvasT.jsx";

class Principal extends Component{
	constructor(props){
		super(props);
	}

	content(){
		var concursos = this.props.concursos;
		var rta;
		if(this.props.misDibujosActivos){
			rta = "No tiene dibujos para mostrar";
		}
		else{
			if(this.props.anteriorConcurso.length!==0){
				rta = "Anterior Concurso";
			}
			else if(concursos.length===0)
				rta="No existen concursos para mostrar";
			else{
				concursos = concursos[0];
				rta = "concurso";
			}
		}
		if(rta === "Anterior Concurso"){
			return (
				<div>
				<div className="feedInicio row">
						{this.props.anteriorConcurso.map((p,i)=>{
							return <CanvasT dibujo={p} key={i} tema={false}></CanvasT>;
						})}
				</div>
				</div>
			);
		}
		else if(rta!=="concurso"){
			return rta;
		}
		else{
			return (
				<div>
					<h1>{concursos.nombre}</h1>
				<div className="feedInicio row">
						{this.props.dibujos.map((p,i)=>{
							return <CanvasT dibujo={p} key={i} tema={false}></CanvasT>;
						})}
				</div>
				</div>
			);
		}
	}

	render(){
		return (
			<div className="Principal">
				<div>{
					this.props.misDibujos.length!==0 ? 
					this.props.misDibujos.map((p,i)=>{
						return <CanvasT dibujo={p} key={i}></CanvasT>;
					}) : this.content()
				}</div>
			</div>
		);
	}
}

Principal.PropTypes={
	concursos: PropTypes.object.isRequired
};

export default Principal;
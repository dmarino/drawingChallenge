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
			if(concursos.length===0)
				rta="No existen concursos para mostrar";
			else{
				console.log(concursos);
				concursos.forEach((p)=>{
					console.log(p);
				});
				rta="Existe algo";
			}
		}
		return rta;
	}

	render(){
		return (
			<div className="Principal">
				<div className="row">
					<div className="col-sm-12 cuerpo">
						<div className="Banner">
						</div>
						<div>{
							this.props.misDibujos.length!==0 ? 
							this.props.misDibujos.map((p)=>{
								<CanvasT dibujo = {p}></CanvasT>;
							}) : this.content()
						}</div>
						<div id="asd"></div>
					</div>
				</div>
			</div>);
	}
}

Principal.PropTypes={
	concursos: PropTypes.object.isRequired
};

export default Principal;
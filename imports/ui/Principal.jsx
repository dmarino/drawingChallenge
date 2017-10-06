import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Principal.css";

class Principal extends Component{
	constructor(props){
		super(props);
	}

	content(){
		var concursos = this.props.concursos;
		var rta;
		if(this.props.misDibujos.length!==0){
			console.log("misDibujos");
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
						<div>{this.content()}</div>
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
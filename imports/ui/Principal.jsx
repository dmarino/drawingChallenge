import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Principal.css";

class Principal extends Component{
	constructor(props){
		super(props);
		this.darConcursos = this.darConcursos.bind(this);
	}

	darConcursos(){
		holi
	}

	render(){
		var user;
		if(this.props.user)
			user=<li>Participar</li>;
		return (
			<div className="Principal">
				<div className="row">
					<div className="col-sm-2 sidebar">
					<ul className="static">
						{user}
						<li>Ver Concurso del día</li>
						<li>{this.darConcursos}</li>
						<li>Buscar Concurso anterior</li>
					</ul>

					</div>
					<div className="col-sm-10 cuerpo">
						<div className="Banner">
						</div>
						<div id="asd"></div>
					</div>
				</div>
			</div>);
	}
}

Principal.PropTypes={
	user: PropTypes.string.isRequired,
	concursos: PropTypes.object.isRequired

};

export default Principal;
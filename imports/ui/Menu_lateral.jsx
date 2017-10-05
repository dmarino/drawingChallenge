import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Menu_lateral.css";

class Menu_lateral extends Component{
	constructor(props){
		super(props);
		this.darConcursos = this.darConcursos.bind(this);
	}

	darConcursos(){
		var rta;
		if(this.props.concursos.length!==0){
			console.log(this.props.concursos);
			rta = "Devuelve algo :D" ;
		}
		return (<li> {rta}
		</li>);
	}

	participar(){
		console.log("heosdkm");
		this.props.participar();
	}

	render(){
		var user;
		console.log(this.props.user);
		if(this.props.user!==null)
			user=<li onClick={this.participar.bind(this)}>Participar</li>;
		return (
			<div className="Menu_lateral">
				<div className="static">
					<ul className="list">
						{user}
						<li>Ver Concurso del día</li>
						{this.darConcursos()}
						<li>Buscar Concurso anterior</li>
					</ul>
				</div>
			</div>);
	}
}

Menu_lateral.PropTypes={
	user: PropTypes.string.isRequired,
	concursos: PropTypes.object.isRequired
};

export default Menu_lateral;
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

	verConcursoDia(){
		console.log("concurso del dia");
		this.props.verConcursoDia();
	}
	participar(){
		console.log("heosdkm");
		this.props.participar();
	}

	verDibujos(){
		console.log("ver Dibujos");
		this.props.verDibujos();
	}
	cerrarSesion(){
		console.log("cerrarSesion");
		this.props.cerrarSesion();
	}

	render(){
		var user;
		var misDibujos;
		var cerrarSesion;
		console.log(this.props.user);
		if(this.props.user!==null){
			user=<li onClick={this.participar.bind(this)}>Participar</li>;
			misDibujos=<li onClick={()=>this.verDibujos()}>Ver mis dibujos</li>;
			cerrarSesion=<li onClick={()=>this.cerrarSesion()}>Cerrar Sesion</li>;
		}
		return (
			<div className="Menu_lateral">
				<div className="static">
					<ul className="list">
						<li onClick={()=>this.verConcursoDia()}>Ver Concurso del día</li>
						{user}
						{misDibujos}
						{this.darConcursos()}
						{cerrarSesion}
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
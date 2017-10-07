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
			var concursos = this.props.concursos;
			concursos = concursos.slice(0);
			concursos.shift();
			return(
				<div>
				<li>
				<a className="accordion-heading" data-toggle="collapse" data-target="#submenu">
		 			<span className="nav-header-primary">Concursos Anteriores <span className="pull-right"><b className="caret">
		 			</b></span></span>
				</a>
				</li>
				<ul className="nav nav-list collapse" id="submenu">
					{concursos.map((p,i)=>{
						return (<li key={i} onClick={()=>this.verConcurso(p.nombre)}>{p.nombre}</li>);
					})}
				</ul></div>
			);
		}
		return (<li> {rta}
		</li>);
	}

	verConcurso(nombre){
		this.props.verConcurso(nombre);
	}
	verConcursoDia(){
		this.props.verConcursoDia();
	}
	participar(){
		this.props.participar();
	}

	verDibujos(){
		this.props.verDibujos();
	}
	cerrarSesion(){
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
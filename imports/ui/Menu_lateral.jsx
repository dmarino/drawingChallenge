import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Menu_lateral.css";

class Menu_lateral extends Component{
	constructor(props){
		super(props);
	}

	verConcursos(){
	   this.props.verAnterior();
	}

	verConcursoDia(){
		this.props.verConcursoDia();
	}

	verDibujos(){
		this.props.verDibujos();
	}

	render(){
		return (
			<div className="Menu_lateral">
			{this.props.user!==null ?
			    <div className="row">
			        <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 columna">  
				        <div className="menuItem" onClick={()=>this.verConcursoDia()}>Concurso del día</div>
			        </div>
			        <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 columna">  
				        <div className="menuItem" onClick={()=>this.verDibujos()}>Mis dibujos</div>
			        </div>
			        <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 columna">
				        <div className="menuItem" onClick={()=>this.verConcursos()}>Concursos Anteriores</div>
			        </div>			        			        
			    </div>			    
			:
			    <div className="row">
			        <div className="col-md-6 col-sm-6 col-lg-6 col-xs-6 columna">  
				        <div className="menuItem" onClick={()=>this.verConcursoDia()}>Concurso del día</div>
			        </div>
			        <div className="col-md-6 col-sm-6 col-lg-6 col-xs-6 columna">
				        <div className="menuItem" onClick={()=>this.verConcursos()}>Concursos Anteriores</div>
			        </div>			        			        
			    </div>			
			}		
			</div>
		);
	}
}

Menu_lateral.PropTypes={
	user: PropTypes.string.isRequired,
	concursos: PropTypes.array.isRequired
};

export default Menu_lateral;
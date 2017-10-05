import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/Principal.css";

class Principal extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="Principal">
				<div className="row">
					<div className="col-sm-12 cuerpo">
						<div className="Banner">
						</div>
						<div id="asd"></div>
					</div>
				</div>
			</div>);
	}
}

Principal.PropTypes={

};

export default Principal;
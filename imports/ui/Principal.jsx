import React, {Component} from "react";
import PropTypes from "prop-types";

class Principal extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="Principal">
			Holi! soy principal.
			</div>);
	}
}

Principal.PropTypes={
	//onClick: PropTypes.func.isRequired
};

export default Principal;
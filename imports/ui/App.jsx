import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";

import {Usuarios} from "../api/usuarios.js";
import {Concurso} from "../api/concurso.js";

class App extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="App"></div>);
	}
}

App.PropTypes={

};

export default createContainer(()=>{
	return{
		Concurso: Concurso.find({}).fetch()
	};
},App);
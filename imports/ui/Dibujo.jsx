import React, {Component} from "react";
import PropTypes from "prop-types";

class Dibujo extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="dibujoCont">
            <h1>BLA BLA</h1>
            </div>);
    }
}
Dibujo.PropTypes={
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    players:PropTypes.array.isRequired
};
export default Dibujo;
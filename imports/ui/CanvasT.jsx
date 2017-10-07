import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/CanvasT.css";

class CanvasT extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.redraw();
	}

	componentWillUpdate(){
		this.redraw();
	}


	redraw() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);

        for(var i=0; i < this.props.dibujo.dibujo.length; i++) {  
            ctx.beginPath();
            if(this.props.dibujo.dibujo[i].dragging && i){
                ctx.moveTo(this.props.dibujo.dibujo[i-1].x, this.props.dibujo.dibujo[i-1].y);
            }else{
                ctx.moveTo(this.props.dibujo.dibujo[i].x-1, this.props.dibujo.dibujo[i].y);
            }
            ctx.lineTo(this.props.dibujo.dibujo[i].x, this.props.dibujo.dibujo[i].y);
            ctx.closePath();
            ctx.strokeStyle = this.props.dibujo.dibujo[i].color;
            ctx.stroke();
        }
    }

	render(){
		return (
				<div className="col-sm-6 CanvasT">
				{this.props.tema?
					<span>Tema: {this.props.dibujo.concurso}</span>:<span>Autor: {this.props.dibujo.autor}</span>
				}	<br/> <span>likes: {this.props.dibujo.likes}</span>
					<canvas 
							width="500"
							height="500"
							ref={(c)=>this.canvas=c}
							></canvas>
				</div>);
	}
}

CanvasT.PropTypes={
};

export default CanvasT;
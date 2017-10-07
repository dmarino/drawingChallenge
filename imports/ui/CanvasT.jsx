import React, {Component} from "react";
import PropTypes from "prop-types";
//import "./Styles/CanvasT.css";

class CanvasT extends Component{
	constructor(props){
		super(props);
	}

	

	redraw() {
		console.log("llega");
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
		console.log("al menos al render");
		return (
			<div className="CanvasT">
				<canvas 
						width="500"
						height="500"
						ref={(c)=>this.canvas=c}
						></canvas>
				{this.redraw()}
			</div>);
	}
}

CanvasT.PropTypes={
};

export default CanvasT;
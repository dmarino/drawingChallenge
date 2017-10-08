import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/CanvasT.css";


import {Dibujos} from "../api/dibujos.js";

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

	like(){
	    var num = this.props.dibujo.likes+1;
	    Dibujos.update(this.props.dibujo._id, {
            $set: { likes:num},
        });
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
		    <div className="CanvasT">
			    <canvas 
				    ref={(c)=>this.canvas=c}
			    >
			    </canvas>
                <div className="container">
			        {this.props.tema ?
					    <h4><b>{this.props.dibujo.concurso}</b></h4> 
				    :
					    <h4><b>{this.props.dibujo.autor}</b></h4> 				
				    }            
                    <p>likes: {this.props.dibujo.likes}</p> 
                    {this.props.like ?
                        <button onClick={()=>this.like()} >Like</button>
                    :
                        null
                    }
                </div>					
			</div>
		);
	}
}

CanvasT.PropTypes={
};

export default CanvasT;
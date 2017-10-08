import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/CanvasT.css";


import {Dibujos} from "../api/dibujos.js";

class CanvasT extends Component{

	constructor(props){
		super(props);
		this.state = {
		    likes:0,
		    cambio:true
		}
	}

	componentDidMount(){
		this.redraw();
	}

	componentWillUpdate(){
	    if(this.state.cambio){
	        var num = this.props.dibujo.likes+1;

	        this.setState({
	            likes: num,
	            cambio: false
	        });
	    }
		this.redraw();
	}

	like(){
	    var num = this.props.dibujo.likes+1;
	    Dibujos.update(this.props.dibujo._id, {
            $set: { likes:num},
        });

        this.forceUpdate();

	    this.setState({
	        likes: num,
	        cambio: true
	    })        
	}

	redraw() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0,500, 500);

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
                    width="500" 
                    height="500"
				    ref={(c)=>this.canvas=c}
			    >
			    </canvas>
                <div className="container">
			        {this.props.tema ?
					    <h5><b>{this.props.dibujo.concurso}</b></h5> 
				    :
					    <h5><b>{this.props.dibujo.autor}</b></h5> 				
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
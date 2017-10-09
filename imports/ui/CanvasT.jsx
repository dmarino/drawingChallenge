import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Styles/CanvasT.css";
import { Meteor } from 'meteor/meteor';


import {Dibujos} from "../api/dibujos.js";

class CanvasT extends Component{

	constructor(props){
		super(props);
		this.state = {
		    likes:0,
		    hizoLike:false,
		    inicio:true
		}
	}

	componentDidMount(){
        this.forceUpdate();  		
	}

	componentWillUpdate(newProps){
		var dibujo;
		if(this.state.inicio &&this.props.dibujo && this.props.like && newProps === undefined){
			dibujo = this.state.dibujo.dibujo;
			this.setState({
	            likes: this.props.dibujo.likes,
	            inicio: false
	        });
	    }
	    else if(newProps !== undefined){
	    	dibujo = newProps.dibujo.dibujo;
	    }

		this.redraw(dibujo);
	}

	like(){
	    var num = this.props.dibujo.likes+1;

	    this.setState({
	        likes: num,
            hizoLike: true		        
	    }) 

	    Meteor.call("dibujos.updateLikes",this.props.dibujo._id,num);  
	}

	redraw(dibujo) {
		if(dibujo !== null && dibujo !== undefined){
	        let ctx = this.canvas.getContext("2d");
	        ctx.clearRect(0, 0,500, 500);
	        for(var i=0; i < dibujo.length; i++) {  
	            ctx.beginPath();
	            if(dibujo[i].dragging && i){
	                ctx.moveTo(dibujo[i-1].x, dibujo[i-1].y);
	            }else{
	                ctx.moveTo(dibujo[i].x-1, dibujo[i].y);
	            }
	            ctx.lineTo(dibujo[i].x, dibujo[i].y);
	            ctx.closePath();
	            ctx.strokeStyle = dibujo[i].color;
	            ctx.stroke();
	        }
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
                    {this.props.like && Meteor.userId() ?
                       <div>
                       		<p>likes: {this.state.likes}</p> 
                            {this.state.hizoLike ?
                                <button className="disable">Liked</button>  
                            :                      
                                <button className="enable" onClick={()=>this.like()}>Like</button>                        
                            }
                       </div>
                    :
                        <p>likes: {this.props.dibujo.likes}</p> 
                    }
                </div>					
			</div>
		);
	}
}

CanvasT.PropTypes={
};

export default CanvasT;
import React, {Component} from "react";
import ReactDOM from 'react-dom';

import PropTypes from "prop-types";

class Dibujo extends Component{
    constructor(props){
        super(props);
        this.state={
            puntos:[],
            paint:false,
            color:"#000000"
        };        
    }

    mouseDown = (e) => {
        var d = ReactDOM.findDOMNode(this).getBoundingClientRect();
        var mouseX = e.pageX - d.left;
        var mouseY = e.pageY - d.top;

        console.log(e.pageY + "-" + d.top + "-" + mouseY);

        this.setState({
            paint:true
        });

        this.addPunto(e.pageX - d.left, e.pageY - d.top);
        this.redraw();        
    }

    mouseMove = (e) => {    
        if(this.state.paint){
            var d = ReactDOM.findDOMNode(this).getBoundingClientRect();       
            this.addPunto(e.pageX - d.left, e.pageY - d.top, true);
            this.redraw();
        }   
    }

    mouseUp = (e) => {
        this.setState({
            paint:false
        })
    }    

    mouseLeave = (e) => {
        this.setState({
            paint:false
        })
    }   

    addPunto = (xP,yP,draggingP) => {
        var puntosT = this.state.puntos;
        puntosT.push({
            x:xP,
            y:yP,
            dragging:draggingP,
            color:this.state.color
        });
        this.setState({
            puntos:puntosT
        })
    }

    redraw() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);

        for(var i=0; i < this.state.puntos.length; i++) {  
            ctx.beginPath();
            if(this.state.puntos[i].dragging && i){
                ctx.moveTo(this.state.puntos[i-1].x, this.state.puntos[i-1].y);
            }else{
                ctx.moveTo(this.state.puntos[i].x-1, this.state.puntos[i].y);
            }
            ctx.lineTo(this.state.puntos[i].x, this.state.puntos[i].y);
            ctx.closePath();
            ctx.strokeStyle = this.state.puntos[i].color;
            ctx.stroke();
        }
    }


    render(){
        return (
            <div id="dibujoContenedor">
            <h1>DRAGON CYBORG</h1>
            <canvas id="canvas" width="500" height="500" onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp ={this.mouseUp} onMouseLeave={this.mouseLeave} ref={(c) => this.canvas = c}>
            </canvas>
            <input type="text" className="basic"/>
            </div>
        );
    }
}

Dibujo.PropTypes={
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    players:PropTypes.array.isRequired
};
export default Dibujo;
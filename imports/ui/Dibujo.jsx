import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { SketchPicker } from 'react-color';

import PropTypes from "prop-types";
import "./Styles/Dibujo.css";

import {Dibujos} from "../api/dibujos.js";

class Dibujo extends Component{
    constructor(props){
        super(props);
        this.state={
            puntos:[],
            paint:false,
            color:"#000000"
        };        
    }

    handleChangeComplete = (colorT) => {
        this.setState({ color: colorT.hex });
    };

    mouseDown = (e) => {
        var d = ReactDOM.findDOMNode(this).getBoundingClientRect();
        var mouseX = e.pageX - 130;
        var mouseY = e.pageY - 105;

        console.log(d);

        this.setState({
            paint:true
        });

        this.addPunto(mouseX , mouseY);
        this.redraw();        
    }

    mouseMove = (e) => {    
        if(this.state.paint){
            var d = ReactDOM.findDOMNode(this).getBoundingClientRect(); 
            var mouseX = e.pageX - 130;
            var mouseY = e.pageY - 105;

            this.addPunto(mouseX, mouseY, true);
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

        Dibujos.update(this.props.dibujo._id, {
            $set: { dibujo: this.state.puntos},
        });
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
            <h1>TEMA: DRAGON CYBORG</h1>
            <div className="row">
                <div className="col-md-8">
                    <canvas id="canvas" width="500" height="500" onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp ={this.mouseUp} onMouseLeave={this.mouseLeave} ref={(c) => this.canvas = c}>
                    </canvas>
                </div>
                <div className="col-md-4">
                    <SketchPicker
                        color={ this.state.color }
                        disableAlpha = {true}
                        onChange={ this.handleChangeComplete }
                    />
                </div>
            </div>
            </div>
        );
    }
}

Dibujo.PropTypes={

};

export default Dibujo;
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

    componentDidMount(){
        this.forceUpdate();
    }
    componentWillUpdate(){
        this.redraw();
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
    }

    mouseMove = (e) => {    
        if(this.state.paint){
            var d = ReactDOM.findDOMNode(this).getBoundingClientRect(); 
            var mouseX = e.pageX - 130;
            var mouseY = e.pageY - 105;

            this.addPunto(mouseX, mouseY, true);
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
        var puntosT = this.props.dibujo.dibujo;
        puntosT.push({
            x:xP,
            y:yP,
            dragging:draggingP,
            color:this.state.color
        });

        Dibujos.update(this.props.dibujo._id, {
            $set: { dibujo: puntosT},
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
        console.log(this.props.dibujo);
        return (
            <div id="dibujoContenedor">
            <h1>TEMA: {this.props.dibujo.concurso}</h1>
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
    dibujo : PropTypes.any.isRequired,
};

export default Dibujo;
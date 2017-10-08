import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { SketchPicker } from 'react-color';
import { Meteor } from 'meteor/meteor';

import PropTypes from "prop-types";
import "./Styles/Dibujo.css";

import {Dibujos} from "../api/dibujos.js";

class Dibujo extends Component{
    constructor(props){
        super(props);
        this.state={
            puntos:[],
            paint:false,
            inicio: true,
            color:"#000000"
        };    
    }

    componentDidMount(){
        this.forceUpdate();
    }
    componentWillUpdate(){
        if(this.state.inicio){
            this.setState({
                puntos:this.props.dibujo.dibujo,
                inicio:false
            })
        }

        this.redraw();
    }

    handleChangeComplete = (colorT) => {
        this.setState({ color: colorT.hex });
    };

    mouseDown = (e) => {
        var d = ReactDOM.findDOMNode(this).getBoundingClientRect();
        var mouseX = e.pageX - 150;
        var mouseY = e.pageY - 290;


        this.setState({
            paint:true
        });

        this.addPunto(mouseX , mouseY);      
    }

    mouseMove = (e) => {    
        if(this.state.paint){
            var d = ReactDOM.findDOMNode(this).getBoundingClientRect(); 
            var mouseX = e.pageX - 150;
            var mouseY = e.pageY - 290;

            this.addPunto(mouseX, mouseY, true);
        }   
    }

    mouseUp = (e) => {
        this.setState({
            paint:false
        })
        this.save();      
    }    

    mouseLeave = (e) => {
        this.setState({
            paint:false
        })

        this.save();
    }   

    save = () =>{
        var puntosT = this.state.puntos;

        var idForServer=this.props.dibujo._id;
        var dataForServer={dibujo: puntosT};
        Meteor.call("dibujos.update", idForServer, dataForServer);

        this.setState({
            inicio:true
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
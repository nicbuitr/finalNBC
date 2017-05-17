import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import d3 from "d3";

import Tweet from "./Tweet.jsx";


export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.state = {
            currentQuery:'',
            plottedDots: [],
            zoomed: false,
    };
  }


  zoom(canvas, ctx){
  	  let zoom = this.props.getZoom();
  	  //ctx.save();
  	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.translate(zoom[1], zoom[2]);

  	  var i = -1, n = this.state.plottedDots.length, d;
	  while (++i < n) {
	    d = this.state.plottedDots[i];
	    ctx.fillStyle = 'red';
	    let z = d;
	    if(zoom[0]){
	    	z=[d[0]+zoom[1],d[1]+zoom[2]];
	    }

	    this.draw(ctx, z);
    	ctx.fill();
		ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
	  }
	  //ctx.restore();
	  this.state.zoomed = !this.state.zoomed;
  }

  draw(ctx, pos){
		ctx.beginPath();
		ctx.moveTo(pos[0], pos[1]);
		ctx.arc(pos[0], pos[1], 4, 0, 2*Math.PI);
  }

  componentWillUpdate() {
  	let canvas = this.canvas;
	let ctx = canvas.getContext('2d');
	if(this.props.getZoom()[0] != this.state.zoomed){
		this.zoom(canvas, ctx);
	}
	else{
		if(this.state.currentQuery != this.props.currentQuery){
			this.state.currentQuery = this.props.currentQuery
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		this.props.tweets.map((tweet, i) => {
			let coord = tweet.coordinates.coordinates;
			let projectionFunction = this.props.getProjection();
			var randomX = d3.random.normal(-75, 5),
   				randomY = d3.random.normal(1, 5);
			let pos = projectionFunction([randomX(), randomY()]);
			this.state.plottedDots.push(pos);
			ctx.fillStyle = 'red';
			this.draw(ctx, pos);
			ctx.fill();
			ctx.lineWidth = 2;
	        ctx.strokeStyle = 'black';
	        ctx.stroke();
	        let count = this.props.addToCount();
		});
	}
  }

  render() {
        return (
        	<div className="overlay-outter">
        	   <div className="overlay-inner">
	    			<canvas id="overlayCanvas" width={this.props.width} height={this.props.height}
	    			 ref={(canv)=>{this.canvas=canv}}></canvas>
	    		</div>
   			 </div>
   		);
  }
}
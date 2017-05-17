import React, {Component} from "react";
import { Meteor } from "meteor/meteor";

import Tweet from "./Tweet.jsx";


export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.state = {
            currentQuery:'',
            plottedDots: [{}],
    };
  }

  zoom(){
  	
  }

  componentWillUpdate() {
  	let canvas = this.canvas;
	let ctx = canvas.getContext('2d');
	if(this.state.currentQuery != this.props.currentQuery){
		this.state.currentQuery = this.props.currentQuery
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	this.props.tweets.map((tweet) => {
		let coord = tweet.coordinates.coordinates;
		let projectionFunction = this.props.getProjection();
		let pos = projectionFunction(coord);
		this.state.plottedDots.push(pos);
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(pos[0], pos[1], 4, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        let count = this.props.addToCount();
	});
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
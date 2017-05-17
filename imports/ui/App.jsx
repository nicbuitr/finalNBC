import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";
import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection = null;
    this.state = {
            currentQuery:'',
            totalNumberOfPlottedTweets:0,
            mapHeight: 600,
            mapWidth: 600,
            data: {RISARALDA:10, CALDAS:12},
            zoom: false,
            x: 0,
            y: 0,
            k: 0,
    };
  }

  setProjection(nProjection) {
    this.projection = nProjection;
  }

  getProjection() {
    return this.projection;
  }

  addToCount(){
    return this.state.totalNumberOfPlottedTweets++;
  }

  setZoom(x, y, k){
    this.state.x = x;
    this.state.y = y;
    this.state.k = k;
    this.state.zoom = !this.state.zoom;  
  }

  getZoom(){
    return [this.state.zoom, this.state.x, this.state.y, this.state.k];
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;
    console.log(evt.target.value);
    this.state.currentQuery = evt.target.value;
    this.state.totalNumberOfPlottedTweets = 0;
    this.props.tweets = null;
    Meteor.call("twitter.stream", evt.target.value);

  }


  render() {
    console.log("render!");
    return (
      <div className="container text-center">
        <hr/>
        <header className="text-center jumbotron">
          <h1><strong>Tweet GeoTracker</strong></h1>
          <hr/>
          <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
          <h4>Total # of tweets plotted around the world: <strong>{this.state.totalNumberOfPlottedTweets}</strong></h4>
        </header>
        
        <div className="text-center jumbotron">
          <h2>Map of Colombia</h2>
          <hr/>
          <Overlay
            currentQuery={this.state.currentQuery}
            tweets={this.props.tweets}
            getProjection={this.getProjection.bind(this)}
            addToCount={this.addToCount.bind(this)}
            getZoom={this.getZoom.bind(this)}
            width={this.state.mapWidth}
            height={this.state.mapHeight}
            data={this.state.data}
          ></Overlay>
          <ColombiaMap
            setProjection={this.setProjection.bind(this)}
            setZoom={this.setZoom.bind(this)}
            width={this.state.mapWidth}
            height={this.state.mapHeight}
            data={this.state.data}
          ></ColombiaMap>
        </div>

        <div className="text-left jumbotron">
          { this.props && this.props.err ?
            <div>Error: {this.props.err}</div> :
            <span></span>
          }
          <h2>Results:</h2>
          {this.props && this.props.tweets ?
            <TweetsResults tweets={this.props.tweets}/> :
            <p>Enter a query</p>
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch(),
  };
}, App);
import React, {Component} from "react";
import { Meteor } from "meteor/meteor";



export default class Overlay extends Component {
  render() {
    return (<div className="overlay">
    	<span>{this.props.overlay.created_at} </span>
    	<span>{this.props.overlay.user.screen_name} </span>
    	<img src={this.props.overlay.user.profile_image_url} alt={this.props.overlay.user.screen_name + "profile image"}/>
      <span>{this.props.overlay.text} </span>
      {/*<span>{JSON.stringify(this.props.overlay)}</span>*/}
    </div>);
  }
}
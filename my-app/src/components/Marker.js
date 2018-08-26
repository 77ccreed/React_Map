import React, { Component } from 'react';
import image from './../data/marker.svg';

class Marker extends Component {

  render() {
    return (
      <div className="marker">
        <img src={image} alt={this.props.key}/>
      </div>
    )
  }
}

export default Marker
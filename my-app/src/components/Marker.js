import React, { Component } from "react";
import image from "./../data/marker.svg";



class Marker extends Component {
  render() {
    const { filteredLocation } = this.props;

    return (
      <div>
       
        <img
          id={filteredLocation.name}
          tabIndex="0"
          className="marker"
          src={image}
          alt={filteredLocation.name}
        />
  
      </div>
    );
  }
}

export default Marker;
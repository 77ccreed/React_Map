import React, { Component } from "react";
import image from "./../data/marker.svg";



class Marker extends Component {
  render() {
    const { filteredLocation, onSelectLocation } = this.props;

    return (
      <div>
       
        <img
          id={filteredLocation.name}
          tabIndex="0"
          className="marker"
          src={image}
          alt={filteredLocation.name}
          onClick={() => onSelectLocation(filteredLocation)}
          onKeyPress={() => onSelectLocation(filteredLocation)}
        />
  
      </div>
    );
  }
}

export default Marker;
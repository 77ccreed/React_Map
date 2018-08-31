import React, { Component } from "react";
import image from "./../data/marker.svg";
import PropTypes from "prop-types";


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

Marker.propTypes = {
          id:PropTypes.string,
          tabIndex: PropTypes.string,
          className : PropTypes.string,
          alt: PropTypes.string,
          onClick: PropTypes.func,
          onKeyPress: PropTypes.func
};
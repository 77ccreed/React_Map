import React, { Component } from 'react';
import image from './../data/marker.svg';

class Marker extends Component {

  render() {
    const { location, onSelectLocation } = this.props;
    return (
      <div className="marker">
        <img
         src={image} alt={this.props.key}
         onClick={() => onSelectLocation(location)}
         onKeyPress={() => onSelectLocation(location)}
         tabIndex="0"
         />
      </div>
    )
  }
}

export default Marker
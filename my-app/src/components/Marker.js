import React, { Component } from 'react';
import image from './../data/marker.svg';

//const Title = ({ text }) => <div className="title">{text}</div>;

class Marker extends Component {

  render() {
    const { location, onSelectLocation} = this.props;
    return (
      <div>
        <img
         id={location.name}
         className="marker"
         src={image} 
         alt={this.props.key}
          onClick={() => onSelectLocation(location)}
         onKeyPress={() => onSelectLocation(location)}
         tabIndex="0"
          
         />
      </div>
    )
  }
}

export default Marker
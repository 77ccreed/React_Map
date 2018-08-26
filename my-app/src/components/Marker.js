import React, { Component } from 'react'
import image from './marker.svg'

class Marker extends Component {

  render() {
    return (
      <div className="marker">
        <img src={image} />
      </div>
    )
  }
}

export default Marker
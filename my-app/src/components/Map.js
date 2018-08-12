import React from 'react'

export default () => {
  return (
    <div id="map"></div>
  )
}
/*
import React, { Component } from 'react';

class Map extends Component {

  // Initialize Google Map when DOM was loaded and call script loading function.
  componentDidMount() {
    window.initMap = this.initMap;

    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M&v=3&callback=initMap')
  }

// https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
// Initialize Google Map
  initMap = () => {
    const mapContainer = document.getElementById('map');
    const map = new window.google.maps.Map(mapContainer, {
      center: { lat: 57.78145679999999, lng: 26.0550403 },
      zoom: 14
    })
    this.props.setMap(map);
  }

  render() {
    return (
      <div id="map" className="map-container"></div>
    )
  }
}

export default Map;


// https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
// Script loading function which is called after the React app has been initialized
// and rendered into the DOM.
function loadMapJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function () {
    document.write('Google Maps can\'t be loaded');
  };
  ref.parentNode.insertBefore(script, ref);
}
*/
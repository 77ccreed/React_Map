import React, {
  Component
} from 'react'
import Map from './components/Map'
import './css/App.css'
/* global google */

export default class App extends Component {

  // Initialize Google Map when DOM was loaded and call script loading function.
  componentDidMount() {
    window.initMap = this.initMap;

    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M&v=3&callback=initMap')
  }

  // https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
  // Initialize Google Map
  initMap = () => {
    new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 57.78145679999999,
        lng: 26.0550403
      },
      zoom: 14
    })
  }

  render() {
    return ( <
      div className = "App">
      <
      Map />
      <
      /div>
    );
  }
}


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
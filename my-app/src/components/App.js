import React, {
  Component
} from 'react'
import Map from './Map'
import './../css/App.css'
// import { locations } from './../data/locations'


export default class App extends Component {
/*
  // Initialize Google Map when DOM was loaded and call script loading function.
  componentDidMount() {
    window.initMap = this.initMap;

    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M&v=3&callback=initMap')
  }


  // https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
  // Initialize Google Map
  initMap = () => {
    let myLatLng = {
      lat: 57.78145679999999,
      lng: 26.0550403 };

    let map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14
    })

    // https://developers.google.com/maps/documentation/javascript/markers#add
    // Add Google Maps marker
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });

    // https://developers.google.com/maps/documentation/javascript/infowindows#open
    // Add an info window
    let infowindow = new google.maps.InfoWindow({
      content: "contentString"
    });

    // https://developers.google.com/maps/documentation/javascript/infowindows#open
    // Open an info window
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });    
  }*/

  render() {
    return (
      <Map />
    )
  }
}
/*
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
}*/
import React, {
  Component
} from 'react';

class Map extends Component {

  state = {
    myLatLng: { lat: 57.78145679999999, lng: 26.0550403 },
    map: "",
    markers: []
  }

  // Initialize Google Map when DOM was loaded and call script loading function and
  // handle Map errors.
  componentDidMount() {
    window.initMap = this.initMap;

    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M&v=3&callback=initMap')

    window.gm_authFailure = this.gm_authFailure
  }
  
  // https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
  // Initialize Google Map
  initMap = () => {
    
    //const { filteredLocation } = this.props;
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.myLatLng,
      zoom: 13
    });

    // Loop over venues array and create markers
    /*this.state.venues.forEach(location => {
      // https://developers.google.com/maps/documentation/javascript/markers#add
      // Create a marker
      let marker = new window.google.maps.Marker({
        position: location.coords,
        title: location.name
      });


      // To add the marker to the map, call setMap();   
      marker.setMap(map)


    });*/
  };

  //https://developers.google.com/maps/documentation/javascript/events#auth-errors
  // Handle Google Maps error
  gm_authFailure() {
    window.alert("Sorry, Google Maps not working!");
  }

  render() {
    return (
      <div id="map" role="application" tabIndex="-1"></div>
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
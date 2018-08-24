import React, {
  Component
} from 'react';

class Map extends Component {

  state = {
    myLatLng: { lat: 57.78145679999999, lng: 26.0550403 },
    map:""
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
    let { venues, searchedVenue } = this.props
    console.log(venues);

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.myLatLng,
      zoom: 13
    });
    this.setState({ map })

    // Empty array for markers
    let markersArray = [];

    // Loop over venues array and create markers
    this.props.venues.map(venue => {
      // https://developers.google.com/maps/documentation/javascript/markers#add
      // Create a marker
      let marker = new window.google.maps.Marker({
        position: { lat: venue.venue.location.lat, lng: venue.venue.location.lng },
        title: venue.venue.name
      });

      // Add marker to the empty markerdArray
      markersArray.push(marker);

      // To add the marker to the map, call setMap();   
      marker.setMap(map)

      // Open infowindow when click a marker and animate clicked marker. Close infowindow when animation end.     
      marker.addListener('click', _ => {
        this.setState({
          dropdownOpen: true
        });
        this.setState({ clickedMarker: [] });
        //this.toggle(marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(_ => {
          infowindow.close();
          marker.setAnimation(null);
        }, 3000);
        // Add clicked marker to the clickedMarker array
        this.state.clickedMarker.push(marker.title);
      });

      // Infowindow content     
     let contentString =
        (`<b>Foursquare info:
      <br>Venue name: ${venue.venue.name}
      <br>Venue id: ${venue.venue.id}</b>
      `)
        ;

      // https://developers.google.com/maps/documentation/javascript/infowindows#open
      // Add an info window
       let infowindow = new window.google.maps.InfoWindow({
         content: contentString
       });

      // https://developers.google.com/maps/documentation/javascript/infowindows#open
      // Open an info window
       marker.addListener('click', function () {
         infowindow.open(map, marker);
        });
    });
    this.setState({ markers: markersArray})
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


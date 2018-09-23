import React, {
  Component
} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import escapeRegExp from "escape-string-regexp";
import "./../css/App.css";
import Map from './Map';
import InputList from './InputList';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.filterInput = this.filterInput.bind(this);

    this.state = {
      venues: [], 
      myLatLng: { lat: 57.78145679999999, lng: 26.0550403 },
      myZoom: 13,
      map: "",
      markers: [],
      input:"",
      searchedVenues: []
    };
  }

  // Get venues, initialize Google Map when DOM was loaded, call script loading function and
  // handle Map errors.
  componentDidMount() {
    this.getVenues();
    window.initMap = this.initMap;

    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M&v=3&callback=initMap')

    window.gm_authFailure = this.gm_authFailure
  }

  /**
   *https://foursquare.com/explore?mode=url&near=Valga%2C%20Estonia&nearGeoId=72057594038515812&q=Food}
   *https://www.youtube.com/watch?v=dAhMIF0fNpo&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=3
   * Get Foursquare data
   */
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "WQBHQGSTMIMA3AF3KZLVAP1A4JUN1AFD4F1XZDBVR10SCUL3",
      client_secret: "AAIPSPJ2TWI4BPNLMCCRP0ZXEOV25HKZLQL45BDSKJZGMD4Q",
      query: "food",
      near: "Valga",
      v: 20180817
    };

    /**
     * Use Axios to fetch Foursquare data and handle errors
     */
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
          searchedVenues: response.data.response.groups[0].items
        },
          () => this.setMarkers());
      })
      .catch(error => {
        console.log("error" + error);
      });
  };

  /**
   * Initialize Google Map
   *https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
   */
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.myLatLng,
      zoom: this.state.myZoom
    });
    this.setState({ map }, () => this.setMarkers())
  }

  /**
   * Create a marker
   */
  setMarkers = () => {
    const { venues, map } = this.state
    const markers = []

    if (map && venues.length > 0 && markers.length === 0) {
      venues.map((venue, index) => {

        var bounds = new window.google.maps.LatLngBounds();

        const marker = new window.google.maps.Marker({
          map: map,
          position: venue.venue.location,
          title: venue.venue.name,
          id: index,
          animation: window.google.maps.Animation.DROP
        })  

        // Animate a marker
        marker.addListener('click', function () {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null)
          } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(function () {
              marker.setAnimation(null)
            }, 100)
          }
        })
        // Display infowindow when marker is clicked
        marker.addListener('click', function () {
          addInfoWindow(this, newInfoWindow)
        })
        markers.push(marker) 

        // Extend bounds based on location
        let locations = new window.google.maps.LatLng(
          marker.position.lat(),
          marker.position.lng()
        )
        bounds.extend(locations)
      })  
      // Create infowindow
      const newInfoWindow = new window.google.maps.InfoWindow()

      // Populate infowindow
      function addInfoWindow(marker, infowindow) {
        const infoContent = `<h2>${marker.title}</h2>`

        // Is infowindow open
        if (infowindow.marker !== marker) {
          infowindow.marker = marker
          infowindow.setContent(infoContent)
          infowindow.open(map, marker)
          // Clear marker prop when infowindow is closed
          infowindow.addListener('closeclick', function () {
            infowindow.setMarker = null
          })
        }
      }
      this.setState({ markers })
    }
  }

  
  // Filters through points of interest & updates UI based on result
  filterInput = (input) => {
    
    this.setState({ input })
    const { markers, venues} = this.state

    if (input) {
      // Case-insensitive matching 
      const match = new RegExp(escapeRegExp(input), 'i')
      // Markers is not visible at start when loop over it
      markers.map((marker) => {
        marker.setVisible(false)
      })
      // Set matching markers to visible
      this.setState({
        searchedVenues: venues.filter((venue) => match.test(venue.venue.name)),
        searchedMarkers: markers.filter((marker) => match.test(marker.title))
          .forEach((marker) => marker.setVisible(true))
      })
    } else {
      // All list items and markers are visible by default if input is empty
      markers.map((marker) => marker.setVisible(true))
      this.setState({
        searchedVenues: venues,
        searchedMarkers: markers
      })
    }
  }

  render() {
    return <main>
      <InputList 
      searchedVenues={ this.state.searchedVenues }
      markers={ this.state.markers }
      filterInput={ this.filterInput }
      />
      <Map />
    </main>;
  }
}

/**
 *https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
 *https://www.youtube.com/watch?v=W5LhLZqj76s
 * Script loading function which is called after the React app has been initialized and rendered into the DOM.
 */
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

App.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string),
  filteredLocation: PropTypes.arrayOf(PropTypes.string),
  activeLocation: PropTypes.objectOf(PropTypes.string),
  selected: PropTypes.bool,
  locationsList: PropTypes.arrayOf(PropTypes.string),
  onFilterLocation: PropTypes.func,
  onSelectLocation: PropTypes.func
};

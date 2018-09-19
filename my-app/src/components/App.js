import React, {
  Component
} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import "./../css/App.css";
import Map from './Map';
import InputList from './InputList';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.filterLocation = this.filterLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.unSelectLocation = this.unSelectLocation.bind(this);

    this.state = {
      activeLocation: {}, 
      selected: false, 
      venues: [], 
      myLatLng: { lat: 57.78145679999999, lng: 26.0550403 },
      map: "",
      markers: []
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
   *
  https://foursquare.com/explore?mode=url&near=Valga%2C%20Estonia&nearGeoId=72057594038515812&q=Food}
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
     *https://github.com/axios/axios
     * Use Axios to fetch Foursquare data and handle errors
     */
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        },
          () => this.setMarkers());
        //console.log(this.state.venues[0].reasons.items[0].summary);
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
      zoom: 13
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
      this.state.venues.map((venue, index) => {

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
        //marker displays infowindow when clicked
        marker.addListener('click', function () {
          fillInfoWindow(this, mapInfoWindow)
        })
        //push markers to state
        markers.push(marker)       
      })  
      //create infowindow
      const mapInfoWindow = new window.google.maps.InfoWindow()

      //populate infowindow
      function fillInfoWindow(marker, infowindow) {
        const infoWindowContent = `<h4>${marker.title}</h4>`

        //check whether infowindow is already open
        if (infowindow.marker !== marker) {
          infowindow.marker = marker
          infowindow.setContent(infoWindowContent)
          infowindow.open(map, marker)
          //clear marker prop when infowindow is closed
          infowindow.addListener('closeclick', function () {
            infowindow.setMarker = null
          })
        }
      }
      this.setState({ markers })
    }
  }

  /**
   * @description filteredLocation default state is locations when it go to Gmap. When input
   *  filtering happend in InputList, then filteredLocation come there
   * @param filteredVenue, come for IntputList
   * @returns filteredLocation[], go to Gmap
   */
  filterLocation(filteredVenues) {
    this.setState({
      filteredLocation: filteredVenues
    });
  }

  /**
   * @description When click or keypress in <DropdownItem> or <Marker> happen
   * @returns activeLocation{}, selected (boolean)
   */
  
  selectLocation(venue) {
    //this.addClassFromMarker(venue);
    this.setState({
      activeLocation: venue,
      selected: true
    });
    //console.log(venue.name);
  }

  /**
   * @description When click happen in a map or a in inputfield unselect selected marker or <DropdownItem>
   * @returns activeLocation:{}, selected:false
   */
  unSelectLocation() {
    this.setState({
      activeLocation: {},
      selected: false
    });
  }


  render() {
    const { venues } = this.state
    return <main>
      <InputList 
      locationsList={venues} 
      onFilterLocation={this.filterLocation} 
      onSelectLocation={this.selectLocation} 
      onUnSelectLocation={this.unSelectLocation} 
      />
      <Map />
    </main>;
  }
}

/**
 *https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
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

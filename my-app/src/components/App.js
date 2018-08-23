//TODO:
//1)Add modal content
//2) Add filtering function what displays markers and list
//3) Set Map location when click in a Marker

import React, {
  Component
} from 'react';
import Map from './Map';
import './../css/App.css';
import escapeRegExp from 'escape-string-regexp';
import PropTypes from 'prop-types';
import {
 // Button, 
  //Modal, 
 // ModalHeader, 
 // ModalBody, 
 // ModalFooter, 
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
//import { locations } from '../data/locations'
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    //bind this
   this.toggleDropDown = this.toggleDropDown.bind(this);
   this.toggle = this.toggle.bind(this);
    //this.updateQuery=this.updateInput.bind(this);
     //this.handleQuery= this.handleInput.bind(this);
    //this.searchLocations = this.searchLocations.bind(this);

    //set state
    this.state = {
      venues: [],
      dropdownOpen: true,
      //myLatLng: { lat: 57.78145679999999, lng: 26.0550403 },
      query: "",     
      //clickedMarker:[],
      searchedVenue:[]
    };  
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  // Initialize Google Map when DOM was loaded and call script loading function, fetch Fourswuare venues and display Google Map error if it happen.
  componentDidMount() {
    this.getVenues();

    //window.initMap = this.initMap
    //window.gm_authFailure = this.gm_authFailure

    //loadMapJS('https://maps.googleapis.com/maps/api/js?&//key=AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M&v=3&callback=initMap');
  }

  //https://www.youtube.com/watch?v=dAhMIF0fNpo&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=3
  // Get Foursquare data
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "WQBHQGSTMIMA3AF3KZLVAP1A4JUN1AFD4F1XZDBVR10SCUL3",
      client_secret: "AAIPSPJ2TWI4BPNLMCCRP0ZXEOV25HKZLQL45BDSKJZGMD4Q",
      query: "food",
      near: "Valga",
      v: 20180817
    };

    // https://github.com/axios/axios
    // Use Axios to fetch Foursquare data and handle errors
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        });
      })
      .catch(error => {
        console.log("error" + error);
      });
  };

  /*
  // https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
  // Initialize Google Map
  initMap = () => {
    console.log(this.state.venues);

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.myLatLng,
      zoom: 13
    }); 

    // Loop over venues array and create markers
    this.state.venues.forEach(venue => {
      // https://developers.google.com/maps/documentation/javascript/markers#add
      // Create a marker
      let marker = new window.google.maps.Marker({
        position: { lat: venue.venue.location.lat, lng: venue.venue.location.lng },
        title: venue.venue.name
      }); 
/*
    // Loop over venues array and create markers
     locations.map((venue) => {
      // https://developers.google.com/maps/documentation/javascript/markers#add
      // Create a marker
      let marker = new window.google.maps.Marker({
        position: venue.coords,
        title: venue.name
      })  */     

      // To add the marker to the map, call setMap();   
      //marker.setMap(map)
       
      // Open infowindow when click a marker and animate clicked marker. Close infowindow when animation end.
      /*
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
      });*/

      // Infowindow content
      /*
     let contentString =
        (`<b>Foursquare info:
      <br>Venue name: ${venue.venue.name}
      <br>Venue id: ${venue.venue.id}</b>
      `)
        ;*/

      // https://developers.google.com/maps/documentation/javascript/infowindows#open
      // Add an info window
      /* let infowindow = new window.google.maps.InfoWindow({
         content: contentString
       });*/

      // https://developers.google.com/maps/documentation/javascript/infowindows#open
      // Open an info window
    /* marker.addListener('click', function () {
       infowindow.open(map, marker);
      });
    });
  };*/

  updateQuery = (query) => {
  this.setState({ dropdownOpen: true });
  this.setState({
    query: query
  })
  this.handleInput(query)
}

handleInput = (query) => {
  let searchVenue

  if (query) {
    const match = new RegExp(escapeRegExp(this.state.query), 'i');

    // Add location to the array if its title match the query 
    searchVenue = this.state.venues.filter(venue =>
      match.test(venue.venue.name)
    );
    this.setState({
      searchedVenue: searchVenue
    });
  }
  else {
    this.setState({
      searchedVenue: this.state.venues
    });
  }
};

  //https://developers.google.com/maps/documentation/javascript/events#auth-errors
  // Handle Google Maps error
  gm_authFailure() {
  window.alert("Sorry, Google Maps not working!");
  }

  render() {
    return (
    <main>
        <InputGroup>
          <Input
            placeholder="Add location name"
            id="input"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropDown}
          >
            <DropdownToggle caret>
              Locations
            </DropdownToggle>
            <DropdownMenu>
              <ListGroup>
                {this.state.venues.map((venue, id) => {    
                  return (<ListGroupItem
                    tag="button"
                    key={id}
                    id="list-items"
                    action
                  >
                    {venue.venue.name}
                  </ListGroupItem>)
                })}
              </ListGroup>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>  
        <Map venues={this.state.venues}
        />
    </main>
    )
  }
}

InputGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  className: PropTypes.string
};



ListGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // boolean to render list group items edge-to-edge in a parent container
  flush: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
}

Input.propTypes = {
  children: PropTypes.node,
  // type can be things like text, password, (typical input types) as well as select and textarea, providing children as you normally would to those.
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,
  valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
  invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

DropdownToggle.propTypes = {
  caret: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  'data-toggle': PropTypes.string,
  'aria-haspopup': PropTypes.bool,
  // For DropdownToggle usage inside a Nav
  nav: PropTypes.bool,
  // Defaults to Button component
  tag: PropTypes.any
};

DropdownMenu.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  flip: PropTypes.bool, // default: true,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  // Custom modifiers that are passed to DropdownMenu.js, see https://popper.js.org/popper-documentation.html#modifiers
  modifiers: PropTypes.object,
  persist: PropTypes.bool // presist the popper, even when closed. See #779 for reasoning
};

// https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
// https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=2
// Script loading function which is called after the React app has been initialized
// and rendered into the DOM. This function created outside React Component
/*function loadMapJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function () {
    document.write('Google Maps can\'t be loaded');
  };
  ref.parentNode.insertBefore(script, ref);
}*/
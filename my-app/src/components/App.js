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
import {
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  ListGroup,
  ListGroupItem } from 'reactstrap';
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
      modal: false,
      dropdownOpen: true,
      venues:[],
      query: "",
      clickedMarker:[],
      searchedVenue:[],
      infowindow: ''

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

  //https://developers.google.com/maps/documentation/javascript/events#auth-errors
  // Handle Google Maps error
  gm_authFailure() {
  window.alert("Sorry, Google Maps not working!");
  }

  // Initialize Google Map when DOM was loaded and call script loading function, fetch Fourswuare venues and display Google Map error if it happen.
  componentDidMount() {  
    this.getVenues();  
    window.initMap = this.initMap
    
    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M&v=3&callback=initMap');

    window.gm_authFailure = this.gm_authFailure
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

  // https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
  // Initialize Google Map
    initMap = () => {
     
  if (!this.state.query) {
    this.setState({
      searchedVenue: this.state.venues
    });
  }

  this.updateQuery = (query) => {
    this.setState({ dropdownOpen: true });
    this.setState({
      query: query
    })
    this.handleInput(query);
    this.initMap();
  }

  this.handleInput = (query) => {
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

  let myLatLng = {
    lat: 57.78145679999999,
    lng: 26.0550403
  };

  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 13
  });

  // Loop over venues array and create markers
  this.state.searchedVenue.map((venue, id) => {
    // https://developers.google.com/maps/documentation/javascript/markers#add
    // Create a marker
    let marker = new window.google.maps.Marker({
      position: { lat: venue.venue.location.lat, lng: venue.venue.location.lng },
      title: venue.venue.name,
      key: { id }
    });

    // To add the marker to the map, call setMap();   
    marker.setMap(map);
  
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
      this.state.clickedMarker.push(marker.title)
    });

    // Infowindow content
    let contentString =
      (`<b>Foursquare info:
      <br>Venue name: ${venue.venue.name}
      <br>Venue id: ${venue.venue.id}</b>`)
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
};

  render() {
    return (
    <main>
      <Modal 
      isOpen={this.state.modal} 
      toggle={this.toggle} 
      className={this.props.className} 
      >
        <ModalHeader 
        toggle={this.toggle}
        >
            {this.state.clickedMarker}
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor
          </ModalBody>
        <ModalFooter
        >
          <Button 
          color="primary" 
          onClick={this.toggle}
          >
          Do Something
          </Button>{' '}
          <Button 
          color="secondary" 
          onClick={this.toggle}
          >
          Cancel
          </Button>
        </ModalFooter>
      </Modal>
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
                {this.state.searchedVenue.map((venue, id) => {               
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
      <Map 
      />
    </main>
    )
  }
}

// https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
// https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=2
// Script loading function which is called after the React app has been initialized
// and rendered into the DOM. This function created outside React Component
function loadMapJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onerror = function () {
    document.write('Google Maps can\'t be loaded');
  };
  ref.parentNode.insertBefore(script, ref);
}

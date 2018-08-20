//TODO:
//1)Add modal content
//2) Add filtering function what displays markers and list
//3) Set Map location when click in a Marker

import React, {
  Component
} from 'react'
import Map from './Map'
import './../css/App.css'
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
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);

    //bind this
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateInput=this.updateInput.bind(this);
    //this.handleInput= this.handleInput.bind(this);

    //set state
    this.state = {
      modal: false,
      dropdownOpen: true,
      venues:[],
      input: "",
      searchedPlaces:[],
      clickedMarker:[]     
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

 updateInput(event){
   const value = event.target.value 
   this.setState(() => ({
     input:value    
   }));   
   console.log(value);
  }


  //https://developers.google.com/maps/documentation/javascript/events#auth-errors
  // Handle Google Maps error
  gm_authFailure() {
  window.alert("Sorry, Google Maps not working!");
  }

  // Initialize Google Map when DOM was loaded and call script loading function.
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
    let myLatLng = {
      lat: 57.78145679999999,
      lng: 26.0550403
    };

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14
    });

    // Loop over venues array and create markers
    this.state.venues.map(venue => {
      // https://developers.google.com/maps/documentation/javascript/markers#add
      // Create a marker
      let marker = new window.google.maps.Marker({
        position: { lat:venue.venue.location.lat, lng: venue.venue.location.lng},
        title: venue.venue.name
      });
      console.log(venue.venue.name);

     // To add the marker to the map, call setMap();   
      marker.setMap(map);

     console.log(marker);
      // Open modal when click a marker and animate clicked marker
      marker.addListener('click', _ => {
        this.setState({ clickedMarker : [] })
        this.toggle(marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(_ => {
          marker.setAnimation(null);
        }, 2000);
        // Add clicked marker to the clickedMarker array
        this.state.clickedMarker.push(marker.title)
        console.log(this.state.clickedMarker);
      });

      /*
      // https://developers.google.com/maps/documentation/javascript/infowindows#open
      // Add an info window
      let infowindow = new google.maps.InfoWindow({
        content: location.name      
      });

      // https://developers.google.com/maps/documentation/javascript/infowindows#open
      // Open an info window
      marker.addListener('click', function () {
        infowindow.open(map, marker);
      }); 
      */ 
    });
  }

 
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
        value={this.state.input}
        onChange={this.updateInput}
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
                      onClick={this.toggle}
                      value={this.state.input}
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
          value={this.state.input}
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

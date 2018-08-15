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
import { locations } from '../data/locations'
/* global google */

export default class App extends Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateInput=this.updateInput.bind(this);

    this.state = {
      modal: false,
      dropdownOpen: true,
      input:"",
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
   const value= event.target.value
 
   this.setState(() => ({
     input:value
   }));
  }

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
      lng: 26.0550403
    };

    let map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14
    })

    // Loop over locations and create markers and info window
    locations.map(location => {
      // https://developers.google.com/maps/documentation/javascript/markers#add
      // Add Google Maps marker
      let marker = new google.maps.Marker({
        map: map,
        position: location.coords,
        title: location.name,
      })
      console.log()

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
    })
  }

 


  render() {
    return (<main>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor
          </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <InputGroup>
        <Input 
        placeholder="Add location name" 
        id="input"
        value={this.state.input}
        onChange={this.updateInput}
        />
        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle caret>
            Locations
            </DropdownToggle>
          <DropdownMenu>
            <ListGroup>
              <ListGroupItem tag="button" action>Conspirator Bar</ListGroupItem>
              <ListGroupItem tag="button" action>Sinel</ListGroupItem>
              <ListGroupItem tag="button" action>Restoran Metsis</ListGroupItem>
              <ListGroupItem tag="button" action>Lilli restoran</ListGroupItem>
              <ListGroupItem tag="button" action>Vabaduse Kohvik</ListGroupItem>
            </ListGroup>
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>  
    <Map />
      </main>
    )
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

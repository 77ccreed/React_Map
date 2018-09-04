/**
 * ToDo:
 * *Click in a List activate a Marker
 * Modal content
 * Click in a Marker or a List activate a Modal
 * Only one active Marker
 */


import React, {
  Component
} from 'react';
import PropTypes from "prop-types";
import "./../css/App.css";
import Gmap from './Gmap';
import InputList from './InputList';
import InfoModal from "./InfoModal";
import { locations } from '../data/locations';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.filterLocation = this.filterLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.unSelectLocation = this.unSelectLocation.bind(this);
    this.addClassFromMarker = this.addClassFromMarker.bind(this);
    this.removeClassFromMarker = this.removeClassFromMarker.bind(this)

    this.state = { locations: locations, filteredLocation: locations, activeLocation: {}, selected: false };
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
   * @name selectLocation
   * @param venue
   * @returns activeLocation{}, selected (boolean)
   */

  selectLocation(venue) {
    //this.removeClassFromMarker();
    this.addClassFromMarker(venue);
    //console.log(venue.name);
    //document.getElementById(venue.name).classList.add("selectedLocation");
    this.setState({
      activeLocation: venue,
      selected: true
    });
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

  /**
* @description add "selectedLocation" className from marker when it is activeLocation object
* @name addClassFromMarker
* @param activeLocation venue
* @returns className "selectedLocation" to marker
*/
  addClassFromMarker(venue) {   
    if (this.state.activeLocation) {
      document.getElementById(venue.name).classList.add("selectedLocation");
    }
  }

  /**
   * @description remove "selectedLocation" className from marker when its not active anymore
   * @name removeClassFromMarker
   * @param 
   * @returns 
   */
  removeClassFromMarker(){
    
}



  render() {
    return <main>
      <InputList locationsList={this.state.locations} onFilterLocation={this.filterLocation} onSelectLocation={this.selectLocation} onUnSelectLocation={this.unSelectLocation} />
      <Gmap filteredLocation={this.state.filteredLocation} onSelectLocation={this.selectLocation} onUnSelectLocation={this.unSelectLocation} />
      <InfoModal
        activeLocation={this.state.activeLocation}
       />
    </main>;
  }
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

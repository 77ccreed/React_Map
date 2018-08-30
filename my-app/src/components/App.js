import React, {
  Component
} from 'react';
import Gmap from './Gmap';
import InputList from './InputList';
import './../css/App.css';
import { locations } from '../data/locations';
import InfoModal from './InfoModal';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.filterLocation=this.filterLocation.bind(this);
    this.selectLocation=this.selectLocation.bind(this);
 
    this.state = {
      locations: locations,
      filteredLocation: locations,
      activeLocation: {},
      selected: false
    };
  }

  /**
   * @description filteredLocation default state is locations when it go to Gmap. When input
   *  filtering happend in InputList, then filteredLocation come there
   * @param filteredVenue, come for IntputList
   * @returns filteredLocation[], go to Gmap 
   */
  filterLocation(filteredVenues){
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
  selectLocation(venue){
    console.log(venue.name);
    this.setState({
      activeLocation: venue,
      selected: true
    });   
    console.log(this.state.activeLocation);
  }

  render() {
    return (
      <main>
        <InputList
        locationsList={this.state.locations}
        onFilterLocation={this.filterLocation}
        onSelectLocation={this.selectLocation}
        />
        <Gmap
        filteredLocation={this.state.filteredLocation}
        onSelectLocation={this.selectLocation}
        />
       <InfoModal />
      </main>
    )
  }
}

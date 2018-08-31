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
                   console.log(venue.name);
                   this.setState({
                     activeLocation: venue,
                     selected: true
                   });
                   console.log(this.state.activeLocation);
                 }

                 /**
                  * @description When click happen in a map or a in inputfield unselect selected marker or <DropdownItem>
                  * @returns activeLocation:{}, selected:false
                  */
                 unSelectLocation(){
                   this.setState({
                     activeLocation: {},
                     selected: false
                   });
                 }

                 render() {
                   return <main>
                       <InputList locationsList={this.state.locations} onFilterLocation={this.filterLocation} onSelectLocation={this.selectLocation} onUnSelectLocation={this.unSelectLocation} />
                       <Gmap filteredLocation={this.state.filteredLocation} onSelectLocation={this.selectLocation} onUnSelectLocation={this.unSelectLocation} />
                       <InfoModal />
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

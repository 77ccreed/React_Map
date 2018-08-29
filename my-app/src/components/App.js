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
 
    //set state
    this.state = {
      locations: locations,
      filteredLocation: locations,
      venues: [],
    };
  }

  /**
   * @description filteredLocation default state is locations when go to Gmap. When input
   *  filtering happend in InputList, then filteredLocation come there
   * @param filteredVenue come for IntputList
   * @returns filteredLocation go to Gmap 
   */
  filterLocation(filteredVenues){
    this.setState({
      filteredLocation: filteredVenues
    });
  };



  render() {
    return (
      <main>
        <InputList
        locationsList={this.state.locations}
        onFilterLocation={this.filterLocation}
        />
        <Gmap
        filteredLocation={this.state.filteredLocation}
        />
       <InfoModal />
      </main>
    )
  }
}

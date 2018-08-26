import React, {
  Component
} from 'react';
//import Map from './Map';
import Gmap from './Gmap';
import InputList from './InputList';
import './../css/App.css';
import axios from 'axios';
import { locations } from '../data/locations'

export default class App extends Component {
  constructor(props) {
    super(props);

    //set state
    this.state = {
      locations: locations,
      filteredLocation: locations,
 
    };
  }

  /**
   * Function for changing of state for filtering locations
   */
  filterLocation = locations => {   
    this.setState({
      filteredLocation: locations
    });
  };

  render() {
    return (
      <main>
        <InputList
          locationList={locations}
          onFilterLocation={this.filterLocation}
        />
        <Gmap
          locationList={this.state.locations}
          filteredLocation={this.state.filteredLocation}
        />
      </main>
    )
  }
}
import React, {
  Component
} from 'react';
import Gmap from './Gmap';
import InputList from './InputList';
import './../css/App.css';
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
          filteredLocation={this.state.filteredLocation}
        />
      </main>
    )
  }
}
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
      activeLocation: {},
      selected: false
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

  /**
 * Function for state of selected location
 */
  selectLocation = location => {
    console.log(location.name);
    this.setState({
      activeLocation: location,
      selected: true
    });
  };

  render() {
    return (
      <main>
        <InputList
          locationList={locations}
          onFilterLocation={this.filterLocation}
          onSelectLocation={this.selectLocation}
          selected={this.state.selected}
        />
        <Gmap
          filteredLocation={this.state.filteredLocation}
          onSelectLocation={this.selectLocation}
        />
      </main>
    )
  }
}
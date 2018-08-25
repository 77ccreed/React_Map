import React, {
  Component
} from 'react';
import Map from './Map';
import InputList from './InputList';
import './../css/App.css';
import axios from 'axios';
import { locations } from '../data/locations'

export default class App extends Component {
  constructor(props) {
    super(props);

    //this.filteringLocation = this.filteringLocation.bind(this);

    //set state
    this.state = {
      locations: locations,
      venues: [],
      filteringLocation: locations
    };
 }

  /**
   * Function for changing of state for filtering locations
   */
  filterLocation = locations => {
    this.setState({
      filteredLocation: locations
    });
  }

  // Get venues
  componentDidMount() {
    this.getVenues();
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

  render() {
    return (
      <main>
        <InputList
          venuesList={this.state.locations}
          onfilterLocation={this.filterLocation}
        />
        <Map
          venuesList={this.state.locations}
          filteringLocation={this.state.filteringLocation}
        />
      </main>
    )
  }
}
import React, {
  Component
} from 'react';
import Gmap from './Gmap';
import InputList from './InputList';
import './../css/App.css';
import { locations } from '../data/locations';
import axios from 'axios';
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

  componentDidMount() {
    this.getVenues();
  }


  /**
   *
  https://foursquare.com/explore?mode=url&near=Valga%2C%20Estonia&nearGeoId=72057594038515812&q=Food}
   *https://www.youtube.com/watch?v=dAhMIF0fNpo&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=3
   * Get Foursquare data
   */
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "WQBHQGSTMIMA3AF3KZLVAP1A4JUN1AFD4F1XZDBVR10SCUL3",
      client_secret: "AAIPSPJ2TWI4BPNLMCCRP0ZXEOV25HKZLQL45BDSKJZGMD4Q",
      query: "food",
      near: "Valga",
      v: 20180817
    };

    /**
     *https://github.com/axios/axios
     * Use Axios to fetch Foursquare data and handle errors
     */
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

  /**
   * @name filterLocation
   * @param filteredVenue
   * @returns filteredLocation
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

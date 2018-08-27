import React, {
  Component
} from 'react';
import Gmap from './Gmap';
import InputList from './InputList';
import './../css/App.css';
import { locations } from '../data/locations';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  
    //set state
    this.state = {
      locations: locations,
      filteredLocation: locations,
      activeLocation: {},
      selected: false,
      venues: [],
      modal: false
    };
  }

  componentDidMount() {
    this.getVenues();
  }

toggle() {
  this.setState({
    modal: !this.state.modal
  });
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
          locations: response.data.response.groups[0].items
        });
      })
      .catch(error => {
        console.log("error" + error);
      });
  };


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
    this.toggle();
    this.setState({
      activeLocation: location,
      selected: true,
    });
  };
  
  /**
   * Function for state of unselected location
   */
  unselectLocation = object => {
    if (object)
    this.setState({
          activeLocation: {},
          selected: false
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
          onUnselectLocation={this.unselectLocation}
        />
        <Gmap
          filteredLocation={this.state.filteredLocation}
          onSelectLocation={this.selectLocation}
          onUnselectLocation={this.unselectLocation}
        />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>kkk</ModalHeader>
          <ModalBody>KK </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </main>
    )
  }
}


Modal.propTypes = {
  // boolean to control the state of the popover
  isOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  // if modal should be centered vertically in viewport
  centered: PropTypes.bool,
  // corresponds to bootstrap's modal sizes, ie. 'lg' or 'sm'
  size: PropTypes.string,
  // callback for toggling isOpen in the controlling component
  toggle: PropTypes.func,
  role: PropTypes.string, // defaults to "dialog"
  // used to reference the ID of the title element in the modal
  labelledBy: PropTypes.string,
  keyboard: PropTypes.bool,
  // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
  backdrop: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['static'])
  ]),
  // allows for a node/componet to exist next to the modal (outside of it). Useful for external close buttons
  // external: PropTypes.node,
  // called on componentDidMount
  onEnter: PropTypes.func,
  // called on componentWillUnmount
  onExit: PropTypes.func,
  // called when done transitioning in
  onOpened: PropTypes.func,
  // called when done transitioning out
  onClosed: PropTypes.func,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  // boolean to control whether the fade transition occurs (default: true)
  fade: PropTypes.bool,
  cssModule: PropTypes.object,
  // zIndex defaults to 1000.
  zIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  // backdropTransition - controls backdrop transition
  // timeout is 150ms by default to match bootstrap
  // see Fade for more details
  innerRef: PropTypes.object,
}
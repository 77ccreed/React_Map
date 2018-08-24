import React, {
  Component
} from 'react';
import Map from './Map';
import './../css/App.css';
import escapeRegExp from 'escape-string-regexp';
import PropTypes from 'prop-types';
import {
  Input, 
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    //bind this
   this.toggleDropDown = this.toggleDropDown.bind(this);

    //set state
    this.state = {
      venues: [],
      dropdownOpen: true,
      query: "",     
      searchedVenue:[]
    };  
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  // Get venues w
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

  updateQuery = (query) => {
  this.setState({ dropdownOpen: true });
  this.setState({
    query: query
  })
  this.handleInput(query)
}

handleInput = (query) => {
  let searchVenue

  if (query) {
    const match = new RegExp(escapeRegExp(this.state.query), 'i');

    // Add location to the array if its title match the query 
    searchVenue = this.state.venues.filter(venue =>
      match.test(venue.venue.name)
    );
    this.setState({
      searchedVenue: searchVenue
    });
  }
  else {
    this.setState({
      searchedVenue: this.state.venues
    });
  }
};

  render() {
    return (
    <main>
        <InputGroup>
          <Input
            placeholder="Add location name"
            id="input"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropDown}
          >
            <DropdownToggle caret>
              Locations
            </DropdownToggle>
            <DropdownMenu>
              <ListGroup>
                {this.state.venues.map((venue, id) => {    
                  return (<ListGroupItem
                    tag="button"
                    key={id}
                    id="list-items"
                    action
                  >
                    {venue.venue.name}
                  </ListGroupItem>)
                })}
              </ListGroup>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>  
        <Map 
        venues={this.state.venues}
        searchedVenue={this.state.searchedVenue}
        />
    </main>
    )
  }
}

InputGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  className: PropTypes.string
};

ListGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // boolean to render list group items edge-to-edge in a parent container
  flush: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
}

Input.propTypes = {
  children: PropTypes.node,
  // type can be things like text, password, (typical input types) as well as select and textarea, providing children as you normally would to those.
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,
  valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
  invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

DropdownToggle.propTypes = {
  caret: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  'data-toggle': PropTypes.string,
  'aria-haspopup': PropTypes.bool,
  // For DropdownToggle usage inside a Nav
  nav: PropTypes.bool,
  // Defaults to Button component
  tag: PropTypes.any
};

DropdownMenu.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  flip: PropTypes.bool, // default: true,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  // Custom modifiers that are passed to DropdownMenu.js, see https://popper.js.org/popper-documentation.html#modifiers
  modifiers: PropTypes.object,
  persist: PropTypes.bool // presist the popper, even when closed. See #779 for reasoning
};
import React from 'react';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label
} from 'reactstrap';
import PropTypes from 'prop-types';

export default class InputList extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);

    this.state = {
      dropdownOpen: true
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  /**
   * @description If marker and list item have same name show marker when click happen
   * @name selectLocation
   * @param venue
   * @returns marker
   */
  selectLocation(venue) {
    this.props.markers.map(function (marker) {
      if (marker.title === venue) {
        window.google.maps.event.trigger(marker, 'click')
      }
    })
  }

  render() {
    return ( <
      InputGroup >
      <Label for="input">Search a dinery:</Label>
      <
      Input 
      placeholder = "Add location name here"
      id = "input"
      value = {
        this.props.input
      }
      onChange = {
        (e) => this.props.filterInput(e.target.value)
      }
      /> <
      InputGroupButtonDropdown addonType = "append"
      isOpen = {
        this.state.dropdownOpen
      }
      toggle = {
        this.toggleDropDown
      } >
      <
      DropdownToggle caret >
      Choose a Dinery <
      /DropdownToggle> <
      DropdownMenu > {
        this.props.searchedVenues.map((venue, id) => ( <
          DropdownItem key = {
            id
          }
          role="menuitem"
          className = "list-items"
          onClick = {
            () => this.selectLocation(venue.venue.name)
          }
          onKeyPress = {
            () => this.selectLocation(venue.venue.name)
          } >
          {
            venue.venue.name
          } <
          /DropdownItem>
        ))
      } <
      /DropdownMenu> <
      /InputGroupButtonDropdown> <
      /InputGroup>
    );
  }
}

InputGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  className: PropTypes.string
};
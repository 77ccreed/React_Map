import React from 'react';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import escapeRegExp from "escape-string-regexp";

export default class InputList extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);

    this.state = {
      dropdownOpen: true,
      input:"",
      filteredVenue:this.props.locationsList
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  updateInput = (input) => {
    this.setState({
      dropdownOpen: true,
      input: input
    })
    this.handleInput(input)
  }

  handleInput = (input) => {

    let SearchVenue;
    if (input) {

      const match = new RegExp(escapeRegExp(this.state.input), 'i');

      // Add location to the array if its title match the input
      SearchVenue = this.props.locationsList.filter(venue =>
        match.test(venue.name)
      );
      this.setState({
        input: input,
        filteredVenue: SearchVenue
      });
    }
    else {
      SearchVenue = this.props.locationsList;
      this.setState({
        input: "",
        filteredVenue: SearchVenue
      });
    }
    this.props.onFilterLocation(SearchVenue);
  };

  render() {
    //const { locationsList}=this.props;
    //const { venuesList } = this.props;
    return (
      <InputGroup>
        <Input
          placeholder="Add location name"
          id="input"
          value={this.state.input}
          onChange={(event) => this.updateInput(event.target.value)}
        />
        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle caret>
            Choose a Dinery
            </DropdownToggle>
          <DropdownMenu>
            {this.state.filteredVenue.map((venue, id) => (
              <DropdownItem
                key={id}
                className="list-items"
              >
                {venue.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>
    );
  }
}

InputGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  className: PropTypes.string
};

/*
<DropdownMenu>
  {filteredVenue.map((venue, id) => (
    <DropdownItem
      key={id}
      className="list-items"
    >
      {venue.venue.name}
    </DropdownItem>
  ))}
</DropdownMenu>*/
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
import escapeRegExp from 'escape-string-regexp';

export default class InputList extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);

    this.state = {
      dropdownOpen: true,
      query: "",
      searchedVenue: this.props.locationList
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  updateQuery = (query) => {
    this.setState({
      query: query,
      dropdownOpen: true
    })
    this.handleInput(query)
  }

  handleInput = (query) => {
    let SearchVenue;
    if (query) {

      const match = new RegExp(escapeRegExp(this.state.query), 'i');

      // Add location to the array if its title match the query 
      SearchVenue = this.props.locationList.filter(location =>
        match.test(location.name)
      );
      this.setState({
        query: query,
        searchedVenue: SearchVenue
      });
    }
    else {
      SearchVenue = this.props.locationList;
      this.setState({
        query: "",
        searchedVenue: SearchVenue
      });
    }
    this.props.onFilterLocation(SearchVenue);
    console.log(SearchVenue);
  };

  render() {
    const { searchedVenue } = this.state;
    return (
      <InputGroup>
        <Input
          placeholder="Add location name"
          id="input"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle caret>
            Choose a Dinery
            </DropdownToggle>
          <DropdownMenu>
            {searchedVenue.map((location, id) => (
              <DropdownItem
                key={id}
                className="list-items"
              >
                {location.name}
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
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

export default class InputList extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);

    this.state = {
      dropdownOpen: true,
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <InputGroup>
        <Input

        />
        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle caret>
            Choose a Dinery
            </DropdownToggle>
          <DropdownMenu>
              <DropdownItem
              >
              </DropdownItem>
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
import React from 'react';
import {
  InputGroup, 
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu, 
  ListGroup, 
  ListGroupItem 
} from 'reactstrap';

export default class Navlist extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: true,
      splitButtonOpen: false
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }


  render() {
    return (
      <div>
    
        <InputGroup>
          <Input placeholder="Add location name" id="input"/>
          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle caret>
              Locations
            </DropdownToggle>
            <DropdownMenu>
              <ListGroup>
                <ListGroupItem tag="button" action>Conspirator Bar</ListGroupItem>
                <ListGroupItem tag="button" action>Sinel</ListGroupItem>
                <ListGroupItem tag="button" action>Restoran Metsis</ListGroupItem>
                <ListGroupItem tag="button" action>Lilli restoran</ListGroupItem>
                <ListGroupItem tag="button" action>Vabaduse Kohvik</ListGroupItem>
              </ListGroup>
            
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
        
        
      </div>
    );
  }
}
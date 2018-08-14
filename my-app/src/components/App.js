import React, {
  Component
} from 'react'
import Map from './Map'
import './../css/App.css'
import Example from './NavbarToggler'

export default class App extends Component {

  render() {
    return (<div>
    <Example />
    <Map / >
      </div>
    )
  }
}
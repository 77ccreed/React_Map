import React, {
  Component
} from 'react'
import Map from './Map'
import './../css/App.css'
import Navlist from './Navlist'

export default class App extends Component {

  render() {
    return (<div>
    <Navlist />
    <Map / >
      </div>
    )
  }
}
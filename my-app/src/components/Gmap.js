import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


class Gmap extends Component {
  static defaultProps = {
    center: {
      lat: 57.78145679999999,
      lng: 26.0550403
    },
    zoom: 13
  };

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure
  }


  /**
   *https://developers.google.com/maps/documentation/javascript/events#auth-errors
   * Handle Google Maps errors
   */
  gm_authFailure() {
    window.alert("Sorry, Google Maps not working!");
  }

  render() {

    const { filteredLocation } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div 
      id="map" 
      role="application" 
      tabIndex="-1"
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

          {filteredLocation.map((location) => (<Marker
            filteredLocation={location}
            key={location.name}
            lat={location.coords.lat}
            lng={location.coords.lng}

          />
          ))}
            
        </GoogleMapReact>
      </div>
    );
  }
}

export default Gmap;
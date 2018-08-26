import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Gmap extends Component {
  static defaultProps = {
    center: {
      lat: 57.78145679999999,
      lng: 26.0550403
    },
    zoom: 13
  };

  render() {

    const { filteredLocation } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '94vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDyA_DwacE3TR1fCdwU1fk-LEem_JSzA2M'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
         

          {filteredLocation.map((location) => (<Marker
            location={location}
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
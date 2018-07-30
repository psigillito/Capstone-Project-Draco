import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
   
  
  render() {
   
    var GoogleMapRoute = withGoogleMap(props => (
        <GoogleMap defaultCenter = { { lat: 44.5646, lng: -123.2620 } } defaultZoom = { 15 }/>
   ));

   return(
      <div>
        <GoogleMapRoute
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default Map;

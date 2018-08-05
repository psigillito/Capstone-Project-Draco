import React, { Component, PureComponent } from 'react';
import { withGoogleMap, GoogleMap, Polyline, lineSymbol } from 'react-google-maps';
const decodePolyline = require('decode-google-map-polyline');
class Map extends PureComponent {
  
  constructor(props) {
    super(props);
  
    this.state = {
      path: [] 
    }  
  
  }      

  render() {
   
    if(this.props.selectedPolyLine != -1){

      const myPolyLine= decodePolyline(this.props.selectedPolyLine);

      var GoogleMapRoute = withGoogleMap(props => (
          <GoogleMap defaultCenter = {myPolyLine[0] } defaultZoom = { 14 }>    
              <Polyline options={{strokeColor: '#2e10ff', geodesic: true }} path={myPolyLine} />
          </GoogleMap>
      ));

    }else{
      var GoogleMapRoute = withGoogleMap(props => (
        <GoogleMap defaultCenter= { {lat:44.5646, lng:-123.2620}  }defaultZoom = { 14 }></GoogleMap>
      ));

    }
    


   
   return(
      <div> 
        <GoogleMapRoute
          containerElement={ <div style={{ height: `425px`, width: '425px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />

      </div>
   );
   }
};
export default Map;

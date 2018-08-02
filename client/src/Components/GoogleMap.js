import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline, lineSymbol } from 'react-google-maps';
const decodePolyline = require('decode-google-map-polyline');
class Map extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      path: [{lat:44.55928, lng:-123.26352}, {lat:44.56602,lng: -123.26009}] 
    }  
  
  }      


  
  render() {
   

    const myPolyLine= decodePolyline("o~}nG~{ioVci@mTLw@?@}@]Js@_EgBLw@gErWt@X{F}BER[OZN}CzRXLmEeB_F}B~E|BeKno@oDuAuCvQAxFQbGvPI]zFDtZ^i@_@h@?bGxRS?m@?l@rDEh@ZRFtB?@`^pA@xJAzO??yA?xAU?N}\\MaAIEO@Pwj@?uGIaBBuHc@CiNEgBeB}CcCkDcB{Ak@lCsPdBcLnWjKpB}KjEhBjA`@kAa@?c@rEuX\\N");



    var GoogleMapRoute = withGoogleMap(props => (
        <GoogleMap defaultCenter = { { lat: 44.5646, lng: -123.2620 } } defaultZoom = { 15 }>    
            <Polyline options={{strokeColor: '#2e10ff', geodesic: true }} path={myPolyLine} />
        </GoogleMap>
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

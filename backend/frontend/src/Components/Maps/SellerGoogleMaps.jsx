import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AnyReactComponent = ({ text }) => <div><LocationOnIcon sx={{color:"red",fontSize:"20px"}}/></div>;

const SellerGoogleMaps = ({lat,lng,setLat,setLng}) => {
    const [markers, setMarkers] = useState([{lat:lat,lng:lng}]);

    const onMapClick = (e) => {
        setLat(e.lat);
        setLng(e.lng);
        setMarkers([{
            lat: e.lat,
            lng: e.lng
          }]);
      };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCQvzbqxgZniOMoHPDNd_Qw9c87CKT0KUA" }}
        defaultCenter={{lat:lat,lng:lng}}
        defaultZoom={12}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
        <AnyReactComponent
        lat={marker.lat}
        lng={marker.lng}
        text="Selected Location"
      />
    ))}
      </GoogleMapReact>
    </div>
  )
}

export default SellerGoogleMaps
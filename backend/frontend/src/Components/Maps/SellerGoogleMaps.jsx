import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AnyReactComponent = ({ text }) => <div><LocationOnIcon sx={{color:"red",fontSize:"20px"}}/></div>;

const SellerGoogleMaps = ({lat,lng,setLat,setLng,disabled=false,defaultZoom=12}) => {


    const onMapClick = (e) => {
      if (!disabled){
        setLat(e.lat);
        setLng(e.lng);
      }
      };

      console.log("lat",lat)
      console.log("lng",lng)
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCQvzbqxgZniOMoHPDNd_Qw9c87CKT0KUA" }}
        defaultCenter={{lat:lat,lng:lng}}
        defaultZoom={defaultZoom}
        onClick={onMapClick}
      >
        <AnyReactComponent
        lat={lat}
        lng={lng}
        text="Selected Location"
      />
      </GoogleMapReact>
    </div>
  )
}

export default SellerGoogleMaps
import React,{useEffect, useRef, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import horseImg from '../../../public/horse.png'

const Marker = ({ children }) => children;

const GoogleMapsCluster = ({lat,lng,allHorseLatLng}) => {
    const debug = import.meta.env.VITE_DEBUG;
    const base_url = import.meta.env.VITE_BASE_URL
    const imagePath = debug=="true"?horseImg:base_url+"static/horse.png";

    const maps_key = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    const navigator = useNavigate();
    const mapRef = useRef(null);
    const [bounds,setBounds] = useState(null);
    const [zoom,setZoom] = useState(12);


    const points = allHorseLatLng.map((item)=>({
        "type":"Feature",
        "properties":{
            "cluster":false,
            "crimeId":item.id,
        },
        "geometry":{
            "type":"Point",
            "coordinates":[item.lng,item.lat]
        }
    }))

    const AnyReactComponent = ({ text }) => <div><LocationOnIcon sx={{color:"red",fontSize:"20px"}}/></div>;

    const { clusters,supercluster } = useSupercluster({
        points: points,
        bounds,
        zoom,
        options: { radius: 75 }
    });

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: maps_key }}
        defaultCenter={{lat:lat,lng:lng}}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat
            ]);
          }}
      >
        {clusters.map(cluster => {
            const [longitude,latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count:pointCount } = cluster.properties;

            if (isCluster){
                return (<Marker
                    key={`cluster-${cluster.id}`}
                    lat={latitude}
                    lng={longitude}
                  >
                    <div
                      className="cluster-marker"
                      style={{
                        width: `${10 + (pointCount / points.length) * 20}px`,
                        height: `${10 + (pointCount / points.length) * 20}px`
                      }}    
                      onClick={() => {
                        const expensionZoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            20
                        )
                        mapRef.current.setZoom(expensionZoom);
                        mapRef.current.panTo({lat:latitude,lng:longitude})
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>)
            }
            return (
                <Marker
            lat={latitude}
            lng={longitude}
          >
            <div key={cluster.properties.crimeId}>
            <button style={{background:"none",border:"none"}} onClick={()=>{
                return navigator(`/home/horse?id=${cluster.properties.crimeId}`)
            }}>
                <img src={imagePath} alt="map-img" style={{height:"40px",width:"40px",border:"1px solid transparent",borderRadius:"20px"}}/>
            </button>
            </div>

          </Marker>
            )
        })
        }
        <AnyReactComponent
        lat={lat}
        lng={lng}
        text="Selected Location"
      />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMapsCluster
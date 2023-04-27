import React,{useEffect, useRef, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import horseImg from '../../assets/horse.png';
import useSupercluster from 'use-supercluster';
import { useNavigate } from 'react-router-dom';

const Marker = ({ children }) => children;

const GoogleMapsCluster = ({lat,lng,allHorseLatLng}) => {

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
            "coordinates":[item.lat,item.lng]
        }
    }))


    const { clusters,supercluster } = useSupercluster({
        points: points,
        bounds,
        zoom,
        options: { radius: 75 }
    });

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCQvzbqxgZniOMoHPDNd_Qw9c87CKT0KUA" }}
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
                <img src={horseImg} alt="map-img" style={{height:"40px",width:"40px",border:"1px solid transparent",borderRadius:"20px"}}/>
            </button>
            </div>

          </Marker>
            )
        })
        }
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMapsCluster
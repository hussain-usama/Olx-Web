import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { getCurrentLocation } from "../../utils/helperFunctions";
import './index.css'


const Maps = (props) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPAPI_KEY,
    loading: "async",
  });
  const [coords, setCoords] = useState({ lat: 24.8607, lng: 67.0011 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat:latitude, lng:longitude })
        },(error) => {
          console.error('Error getting location:', error);
        });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const markers = [{ lat: 24.8607, lng: 67.0011 }];
  return (
    <div className="map-container-main">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
            mapContainerStyle={{ width:props.width || '700px', height:props.height || '400px'}}
            center={coords}
            zoom={10}
        >
            {/* <Marker position={coords} />
            <Marker position={coords} /> */}
             {markers.map(({ lat, lng }) => (
            <Marker position={{ lat, lng }} />
          ))}
           {markers.map(({ lat, lng }) => (
            <Marker position={{ lat, lng }} />
          ))}
      </GoogleMap>
      )}
    </div>
  );
};

export default Maps;

// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import { useMemo } from "react";

// const Maps = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPAPI_KEY,
//     loading: "async",
//   });
//   const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

//   return (
//     <div className="">
//       {!isLoaded ? (
//         <h1>Loading...</h1>
//       ) : (
//         <GoogleMap
//           mapContainerClassName="map-container"
//           center={center}
//           zoom={10}
//         >
//           <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
//         </GoogleMap>
//       )}
//     </div>
//   );
// };

// export default Maps;
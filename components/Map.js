import { useState } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import 'mapbox-gl/dist/mapbox-gl.css';

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 11,
    });

  return (
    <ReactMapGL
        mapStyle="mapbox://styles/ganefiatri/cl9ogn51x00da14ms0okwr8bl"
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
    >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker 
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p aria-label="push-pin" role="img" onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">📍</p>
                </Marker>
                {selectedLocation && (
                    <Popup
                        onClose={() => setSelectedLocation(false)}
                        anchor="bottom"
                        longitude={result.long}
                        latitude={result.lat}
                    >
                        {result.title}
                    </Popup>
                )}
            </div>
        ))}
    </ReactMapGL>
  );
}

export default Map
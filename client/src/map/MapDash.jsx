import React, { useEffect, useState } from "react";
import {} from "../features/place/placeService";

import {
  GoogleMap,
  InfoWindow,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

import { useAllPlacesQuery } from "../features/place/placeService";
import Spinner from "../components/Spinner";

const MapDash = ({ center }) => {
  const apiKey = "AIzaSyDAdnf6eqCFBTcFRQ3wHAFGIrVArQJzh0c";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const {data, isFetching} = useAllPlacesQuery();
  console.log(data);

  const [selectedPlace, setSelectedPlace] = useState();

  const containerStyle = {
    width: "60%",
    height: "50vh",
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseInfoWindow = () => {
    setSelectedPlace();
  };

  // const center = {
  //   lat: 37.0012220691501,
  //   lng: 35.32191010386118,
  // };

  return (
    <>
      {!isLoaded ? (
        <Spinner />
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center || { lat: 37.00128949807853, lng: 35.321856358738025 }} // Use the provided center or a default value
          zoom={15}
        >
          {!isFetching ? (
            data.places.map((place) => (
              <Marker
                key={place.id}
                position={{
                  lat: Number(place.coordinates.lat),
                  lng: Number(place.coordinates.lng),
                }}
                onClick={() => handleMarkerClick(place)}
              />
            ))
          ) : (
            <Spinner />
          )}

          {selectedPlace && (
            <InfoWindow
              position={{
                lat: Number(selectedPlace.coordinates.lat),
                lng: Number(selectedPlace.coordinates.lng),
              }}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>
                <h3>Place : {selectedPlace.name}</h3>
                {/* <p>Stop Description: {selectedPlace.stop_desc}</p> */}
                {/* <p>Stop Code: {selectedStop.stop_code}</p> */}
                <p>
                  Location: ({selectedPlace.coordinates.lat},
                  {selectedPlace.coordinates.lng})
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default MapDash;

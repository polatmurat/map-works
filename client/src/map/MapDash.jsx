import React, { memo, useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
const MapDash = ({ center }) => {
  const apiKey = "AIzaSyDAdnf6eqCFBTcFRQ3wHAFGIrVArQJzh0c";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState();

  const containerStyle = {
    width: "60%",
    height: "50vh",
  };

  useEffect(() => {
    const fetchURI = "http://localhost:5173/assets/places.json";

    const fetchData = async () => {
      try {
        const response = await fetch(fetchURI);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();

        setPlaces(jsonData);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

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
        "Yükleniyor"
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center || { lat: 37.00128949807853, lng: 35.321856358738025 }} // Use the provided center or a default value
          zoom={15}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              position={{
                lat: place.coordinates.lat,
                lng: place.coordinates.lng,
              }}
              onClick={() => handleMarkerClick(place)}
            />
          ))}

          {selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.coordinates.lat,
                lng: selectedPlace.coordinates.lng,
              }}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>
                <h3>Place : {selectedPlace.name}</h3>
                {/* <p>Stop Description: {selectedPlace.stop_desc}</p> */}
                {/* <p>Stop Code: {selectedStop.stop_code}</p> */}
                <p>
                  Location: ({selectedPlace.coordinates.lat},{" "}
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

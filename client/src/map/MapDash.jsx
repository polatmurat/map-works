import React, { memo, useCallback, useState } from "react";
import { GoogleMap, InfoWindow, useLoadScript, Marker } from "@react-google-maps/api";
function MapDash() {
  const apiKey = "AIzaSyDAdnf6eqCFBTcFRQ3wHAFGIrVArQJzh0c";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 37.0012220691501,
    lng: 35.32191010386118,
  };

  return (
    <>
      {!isLoaded ? (
        "Yükleniyor"
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {/* {visibleStops.map((stop) => (
            <Marker
              key={stop.stop_id}
              position={{ lat: stop.stop_lat, lng: stop.stop_lon }}
              onClick={() => handleMarkerClick(stop)}
            />
          ))}
          {selectedStop && (
            <InfoWindow
              position={{
                lat: selectedStop.stop_lat,
                lng: selectedStop.stop_lon,
              }}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>
                <h3>Stop Name: {selectedStop.stop_name}</h3>
                <p>Stop Description: {selectedStop.stop_desc}</p>
                <p>Stop Code: {selectedStop.stop_code}</p>
                <p>
                  Stop Location: ({selectedStop.stop_lat},{" "}
                  {selectedStop.stop_lon})
                </p>
              </div>
            </InfoWindow>
          )} */}
        </GoogleMap>
      )}
    </>
  );
}

export default MapDash;

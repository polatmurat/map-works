import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MapDash from "../map/MapDash";
import SidebarCities from "../components/skeleton/SidebarCities";
import DashPlaces from "./places/DashPlaces";

const Dashboard = () => {
  const [selectedCityCoordinates, setSelectedCityCoordinates] = useState(null);

  const handleCityClick = (latitude, longitude) => {
    setSelectedCityCoordinates({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) =>
          setSelectedCityCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        () => console.log("An error occured.")
      );
    }
  }, []);

  return (
    <>
        <Nav />
        <div className="flex min-h-screen w-full b-tekin bg-opacity-90">
          <div className="w-[20%] bg-gray-700 h-[100vh] text-white overflow-y-auto fixed mt-[75px]">
            <SidebarCities onCityClick={handleCityClick} />
          </div>
          <div className="w-[80%] flex flex-col justify-around items-center ml-[20%] mt-[75px]">
            <MapDash center={selectedCityCoordinates} />
            <div className="w-[60%] rounded-lg">
              <DashPlaces />
            </div>
          </div>
        </div>
    </>
  );
};

export default Dashboard;
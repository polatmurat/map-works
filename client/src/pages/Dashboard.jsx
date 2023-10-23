import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MapDash from "../map/MapDash";
import SidebarCities from "../components/skeleton/SidebarCities";

const Dashboard = () => {
  const [selectedCityCoordinates, setSelectedCityCoordinates] = useState(null);

  const handleCityClick = (latitude, longitude) => {
    setSelectedCityCoordinates({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) =>
          await setSelectedCityCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        () => console.log("An error occured.")
      );
    }
  }, []);

  return (
    <>
      <div className="">
        <Nav />
        <div className="mt-[70px] flex min-h-screen w-full">
          <div className="w-[20%] bg-gray-700 h-[100vh] text-white overflow-y-auto fixed">
            <SidebarCities onCityClick={handleCityClick} />
          </div>
          <div className="w-[80%] flex flex-col justify-around items-center ml-[20%]">
            <MapDash center={selectedCityCoordinates} />
            <div>Murat</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

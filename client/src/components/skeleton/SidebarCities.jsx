import React, { useEffect, useState } from "react";

const SidebarCities = ({ onCityClick }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchURI = "http://localhost:5173/assets/cities.json";

    const fetchData = async () => {
      try {
        const response = await fetch(fetchURI);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();

        setCities(jsonData);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="w-full">
      <ul>
        {cities.map((city, index) => (
          <li
            onClick={() => onCityClick(Number(city.latitude), Number(city.longitude))}
            key={index}
            className="mb-1 p-5 bg-gray-600 hover:bg-gray-700 cursor-pointer"
          >
            {city.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarCities;

import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetPlacesQuery,
  useDeletePlaceMutation,
} from "../../features/place/placeService";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { clearMessage } from "../../app/reducers/globalReducer";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/skeleton/Pagination";
import ScreenHeader from "../../components/skeleton/ScreenHeader";
import { BsBox } from "react-icons/bs";

const DashPlaces = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetPlacesQuery(page ? page : 1);

  // const { success } = useSelector((state) => state.globalReducer);

  // const success = true;

  // useEffect(() => {
  //   if (success) {
  //     toast.success(success);
  //   }

  //   return () => {
  //     dispatchEvent(clearMessage());
  //   };
  // }, []);



  return (
    <div>
        {!isFetching ? (
          data?.places?.length > 0 ? (
            <>
              <div>
                <table className="w-full bg-tablecolor rounded-md">
                  <thead>
                    <tr className="border-b border-gray-800 text-left">
                      <th className="p-3 uppercase text-base font-sm text-gray-800">
                        Name
                      </th>
                      <th className="p-3 uppercase text-base font-sm text-gray-800">
                        Category
                      </th>
                      <th className="p-3 uppercase text-base font-sm text-gray-800">
                        City
                      </th>
                      <th className="p-3 uppercase text-base font-sm text-gray-800">
                        Province
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.places.map((place) => (
                      <tr key={place._id}>
                        <td className="p-3 capitalize text-sm font-normal text-black">
                          {place.name}
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-black">
                          {place.category}
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-black">
                          {place.city}
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-black">
                          {place.province}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                page={parseInt(page)}
                perPage={data.perPage}
                count={data.count}
                path="dashboard/places"
              />
            </>
          ) : (
            "There is no places, have been added yet."
          )
        ) : (
          <Spinner />
        )}
    </div>
  );
};

export default DashPlaces;

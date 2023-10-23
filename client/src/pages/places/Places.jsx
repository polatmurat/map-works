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
import Wrapper from "./Wrapper";
import { BsBox } from "react-icons/bs";

const Places = () => {
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

  console.log(data, " dataaaaa");

  const [deleteProduct, response] = useDeletePlaceMutation();

  const delProd = (prodID) => {
    if (window.confirm("Are you sure to delete that product?")) {
      deleteProduct(prodID);
    }
  };

  console.log(response);
  return (
    <>
      <Wrapper>
        <ScreenHeader>
          <Link
            to="/dashboard/create-place"
            className="btn-dark inline-flex items-center"
          >
            <BsBox className="mr-2" />
            Create Place
          </Link>
          <Toaster position="top-right" />
        </ScreenHeader>
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
                      <th className="p-3 uppercase text-base font-sm text-gray-800">
                        Edit
                      </th>
                      <th className="p-3 uppercase text-base font-sm text-gray-800">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.places.map((place) => (
                      <tr key={place._id} className="odd:bg-gray-100">
                        <td className="p-3 capitalize text-sm font-normal text-gray-600">
                          {place.name}
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-600">
                          {place.category}
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-600">
                          {place.city}
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-600">
                          {place.province}
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-600">
                          <Link
                            to={`/dashboard/update-product/${place._id}`}
                            className="bg-palette4 w-1/4 px-5 py-2 cursor-pointer text-white rounded-sm"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-600">
                          <a
                            className="bg-red-500 w-1/4 px-4 py-2 cursor-pointer text-white rounded-sm"
                            onClick={() => delProd(place._id)}
                          >
                            Delete
                          </a>
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
            "There is no products, have been added yet."
          )
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  );
};

export default Places;

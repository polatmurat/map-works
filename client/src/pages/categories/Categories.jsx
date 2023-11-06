import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetQuery,
  useDeleteCategoryMutation,
} from "../../features/category/categoryService";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { clearMessage } from "../../app/reducers/globalReducer";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/skeleton/Pagination";
import ScreenHeader from "../../components/skeleton/ScreenHeader";
import Wrapper from "../Wrapper";
import { BsBox } from "react-icons/bs";

const Categories = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetQuery(page ? page : 1);

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

  const [deleteCategory, response] = useDeleteCategoryMutation();

  const delCategory = (categoryID) => {
    if (window.confirm("Are you sure to delete that category?")) {
      deleteCategory(categoryID);
    }
  };

  console.log(response);
  return (
    <>
      <Wrapper>
        <ScreenHeader>
          <Link
            to="/dashboard/create-category"
            className="btn-dark inline-flex items-center"
          >
            <BsBox className="mr-2" />
            Add Categories
          </Link>
          <Toaster position="top-right" />
        </ScreenHeader>
        {!isFetching ? (
          data?.categories?.length > 0 ? (
            <>
              <div>
                <table className="w-full bg-tablecolor rounded-md">
                  <thead>
                    <tr className="border-b border-gray-800 text-left">
                      <th className="p-3 uppercase text-base font-sm text-gray-800">
                        Name
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
                    {data?.categories?.map((category) => (
                      <tr key={category._id} >
                        <td className="p-4 capitalize text-sm font-normal text-black">
                          {category.name}
                        </td>
                        <td className="p-4 capitalize text-sm font-normal text-black">
                          <Link
                            to={`/dashboard/update-category/${category._id}`}
                            className="bg-palette4 w-1/4 px-5 py-2 cursor-pointer text-white rounded-md"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="p-4 capitalize text-sm font-normal text-black">
                          <a
                            className="bg-red-500 w-1/4 px-4 py-2 cursor-pointer text-white rounded-md"
                            onClick={() => delCategory(category._id)}
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
                path="dashboard/categories"
              />
            </>
          ) : (
            "There is no categories, have been added yet."
          )
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  );
};

export default Categories;

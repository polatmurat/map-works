import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import ScreenHeader from "../../components/skeleton/ScreenHeader";
import { useCreatePlaceMutation } from "../../features/place/placeService";
import { useAllCategoriesQuery } from "../../features/category/categoryService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { setSuccess } from "../../app/reducers/globalReducer";

const CreatePlace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authReducer);

  const [value, setValue] = useState("");

  const { data = [], isFetching } = useAllCategoriesQuery();

  const [state, setState] = useState({
    name: "",
    category: "",
    city: "",
    province: "",
    coordinates: { lat: "", lng: "" },
    authorID: user.id,
  });

  const handlePlace = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lng") {
      setState({
        ...state,
        coordinates: {
          ...state.coordinates,
          [name]: value,
        },
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const [createNewPlace, response] = useCreatePlaceMutation();

  const createPlc = (e) => {
    e.preventDefault();

    if (
      !state.name ||
      !state.category ||
      !state.coordinates.lat ||
      !state.coordinates.lng
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();

    formData.append("data", JSON.stringify(state));
    formData.append("description", value);

    console.log(formData);

    createNewPlace(formData);
  };

  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => {
        toast.error(err.msg);
      });
    }
  }, [response?.error?.data?.errors]);

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/places");
    }
  }, [response?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/places"
          className="btn-dark inline-flex items-center"
        >
          <BsArrowLeft className="mr-2" />
          Places List
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder />
      <div className="flex flex-wrap -mx-3">
        <form className="w-full xl:w-8/12 p-3" onSubmit={createPlc}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="name" className="input-label">
                Place Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Place Name..."
                onChange={handlePlace}
                value={state.name}
                required
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
            <label htmlFor="category" className="input-label">Category</label>
              {!isFetching ? (
                data.categories.length > 0 && (
                  <select
                    name="category"
                    id="categories"
                    className="form-control"
                    onChange={handlePlace}
                    value={state.category}
                  >
                    <option value="">Choose Category...</option>
                    {data?.categories?.map((category) => (
                      <option
                        value={category.name}
                        key={category._id}
                        className="capitalize"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
            <div className="w-full p-3">
              <label className="input-label">Coordinates</label>
              <div className="w-full p-3 md:6/12">
                <label htmlFor="lat" className="input-label">
                  Latitude
                </label>
                <input
                  type="number"
                  name="lat"
                  className="form-control"
                  value={state.coordinates.lat}
                  onChange={handlePlace}
                  placeholder="Latitude..."
                  required
                />
              </div>
              <div className="w-full p-3 md:6/12">
                <label htmlFor="lng" className="input-label">
                  Longitude
                </label>
                <input
                  type="number"
                  name="lng"
                  className="form-control"
                  value={state.coordinates.lng}
                  onChange={handlePlace}
                  placeholder="Longitude..."
                  required
                />
              </div>
            </div>
            <div className="w-full p-3">
              <label htmlFor="description" className="label">
                Description
              </label>
              <ReactQuill
                theme="snow"
                value={value}
                id="description"
                onChange={setValue}
                className="placeholder:text-white"
                placeholder="Description..."
                required
              />
              <div className="w-full p-3">
                <input
                  type="submit"
                  value={response.isLoading ? "Loading..." : "Save Place"}
                  disabled={response.isLoading}
                  className="btn-dark py-2 -ml-3 my-2"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default CreatePlace;

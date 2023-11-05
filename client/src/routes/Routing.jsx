import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import PrivateUser from "./PrivateUser";
import Account from "../pages/auth/Account";
import UserAuthRoute from "./UserAuthRoute";
import Places from "../pages/places/Places";
import UpdatePlaces from "../pages/places/UpdatePlaces";
import CreatePlace from "../pages/places/CreatePlace";
import Categories from "../pages/categories/Categories";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<UserAuthRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/user"
            element={
              <PrivateUser>
                <Account />
              </PrivateUser>
            }
          />
          <Route
            path="dashboard"
            // element={
            //   <PrivateUser>
            //     <Dashboard />
            //   </PrivateUser>
            // }
          >
            <Route
              path="update-place/:id"
              element={
                <PrivateUser>
                  <UpdatePlaces />
                </PrivateUser>
              }
            />
            <Route
              path="places"
              element={
                <PrivateUser>
                  <Places />
                </PrivateUser>
              }
            />
            <Route
              path="places/:page"
              element={
                <PrivateUser>
                  <Places />
                </PrivateUser>
              }
            />
            <Route
              path="create-place"
              element={
                <PrivateUser>
                  <CreatePlace />
                </PrivateUser>
              }
            />
            <Route
              path="categories"
              element={
                <PrivateUser>
                  <Categories />
                </PrivateUser>
              }
            />
            <Route
              path="categories/:page"
              element={
                <PrivateUser>
                  <Categories />
                </PrivateUser>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;

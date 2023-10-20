import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import PrivateUser from "./PrivateUser";
import Account from "../pages/auth/Account";
import UserAuthRoute from "./UserAuthRoute";

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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;

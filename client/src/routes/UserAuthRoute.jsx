import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserAuthRoute = () => {
  const { userToken } = useSelector((state) => state.authReducer);

  return userToken ?  <Navigate to="/dashboard" /> : <Outlet /> ;
};

export default UserAuthRoute;

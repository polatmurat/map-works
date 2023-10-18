import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const PrivateUser = () => {
  const { userToken } = useSelector((state) => state.authReducer);

  return userToken ? <Dashboard /> : <Navigate to="/login" />;
};

export default PrivateUser;

import React from "react";

import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import { Loader } from "../../index";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);


  if (authLoading) {
    return <Loader />;
  }


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  return children;
}

export default ProtectedRoute;

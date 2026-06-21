import React from "react";

import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import { Loader } from "../../index";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);

  // AUTH CHECK CHAL RAHA HAI
  if (authLoading) {
    return <Loader />;
  }

  // LOGIN NAHI HAI
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // LOGIN HAI
  return children;
}

export default ProtectedRoute;

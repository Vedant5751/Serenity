// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { userPool } from "../aws-config"; // Adjust the path as necessary

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = () => {
    const user = userPool.getCurrentUser();
    return user !== null; // Returns true if the user is authenticated
  };

  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;

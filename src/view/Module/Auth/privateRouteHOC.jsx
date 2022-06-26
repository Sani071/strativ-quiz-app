import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthValue } from "../../../context/AuthContext";

export default function PrivateRouteHOC({ children }) {
  const { authInfo } = useAuthValue();
  if (!authInfo.loggedIn) {
    // user is not authenticated
    return <Navigate to="/auth" />;
  }
  return children;
}

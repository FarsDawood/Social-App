import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoute({children}) {
  const isLoaded = !!localStorage.getItem("token");
  return <>{isLoaded ? <Navigate to={"/"} /> : children}</>;
}

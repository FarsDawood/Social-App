import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
  const isLoaded = !!localStorage.getItem("token");
  console.log(children);
  return <>{isLoaded ? children : <Navigate to={"/login"} />}</>;
}

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({children}) {
    const { userToken } = useContext(AuthContext);
    const isLoaded = !!userToken;
  console.log(children);
  return <>{isLoaded ? children : <Navigate to={"/login"} />}</>;
}

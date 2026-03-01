import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedAuthRoute({children}) {
    const { userToken } = useContext(AuthContext);
  const isLoaded = !!userToken;
  return <>{isLoaded ? <Navigate to={"/"} /> : children}</>;
}

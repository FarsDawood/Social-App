import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-950 p-4">
        <Outlet />
      </div>
    </>
  );
}

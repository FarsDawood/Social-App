import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container w-[80%] mx-auto p-5 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

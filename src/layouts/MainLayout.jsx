import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className=" bg-slate-50 dark:bg-slate-950">
        <div className="container max-w-7xl mx-auto  py-8 px-4 min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

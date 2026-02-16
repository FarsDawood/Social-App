import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { path: "", element: <Feed /> },
        { path: "profile", element: <Profile /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </>
  );
}

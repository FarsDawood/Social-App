import React from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Register from "./Pages/Register";
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import ProtectedAuthRoute from './protectedRoutes/ProtectedAuthRoute';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { path: "", element: <ProtectedRoute><Feed /></ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute><Profile/></ProtectedRoute>   },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
        { path: "register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
      ],
    },
  ]);

  return (
    <>
      <HeroUIProvider>
        <ToastProvider />
        <RouterProvider router={router} />
      </HeroUIProvider>
    </>
  );
}

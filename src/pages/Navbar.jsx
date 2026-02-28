import React from "react";
import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import { Link, useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <HeroUiNavbar isBlurred maxWidth="xl" className="bg-white/70 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-green-900 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span className="font-black text-2xl text-green-900 tracking-tight">Sohba</span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative text-sm font-semibold transition-colors hover:text-green-800 ${isActive ? "text-green-900 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-green-900" : "text-slate-500"}`
            }
          >
            Feed
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end" closeOnSelect={true} className="shadow-xl border border-slate-100">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform hover:scale-105"
              color="success" // أخضر يليق بالديزاين
              size="sm"
              // 1. لو الـ API لسه مبعتش صورة، الـ src هيكون null أو فاضي
              src={
                localStorage.getItem("userPhoto") || "https://api.dicebear.com/8.x/notionists/svg?seed=Fares" // صورة افتراضية شيك
              }
              // 2. ده هيظهر الأيقونة كـ fallback لو الصورة الافتراضية محملتش
              showFallback
              fallback={
                <div className="flex items-center justify-center w-full h-full bg-slate-200 text-slate-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Menu" variant="flat">
            <DropdownItem key="profile_header" className="h-14 gap-2 opacity-100 cursor-default">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Account</p>
              <p className="font-bold text-slate-800 truncate">{userEmail}</p>
            </DropdownItem>

            <DropdownItem key="profile" onPress={() => navigate("/profile")} showDivider>
              My Profile
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              className="text-danger font-semibold"
              onPress={handleLogout}
              description="Sign out of your account"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroUiNavbar>
  );
}

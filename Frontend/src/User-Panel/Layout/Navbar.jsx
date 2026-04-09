import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MapPin,
  Bell,
  User as UserIcon,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "Find Parking", path: "/user/find-parking" },
    { name: "My Bookings", path: "/user/bookings" },
    { name: "Support", path: "/user/support" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#222222]/80 backdrop-blur-xl border-b border-[#F5E7C6]/5 h-20">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div
          onClick={() => navigate("/user/dashboard")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-10 w-10 bg-[#FA8112] rounded-xl flex items-center justify-center shadow-lg shadow-[#FA8112]/20 group-hover:scale-105 transition-transform">
            <MapPin size={24} className="text-[#222222]" />
          </div>
          <span className="text-xl font-black tracking-tighter text-[#FAF3E1]">
            Smart-Park
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                text-sm font-bold tracking-wide transition-colors
                ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/40 hover:text-[#FAF3E1]"}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* User Profile & Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FA8112] rounded-full border-2 border-[#222222]"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 pr-3 rounded-full bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 hover:border-[#FA8112]/40 transition-all"
            >
              <div className="h-8 w-8 rounded-full bg-[#FA8112] flex items-center justify-center text-[#222222] font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="hidden md:block text-xs font-bold text-[#FAF3E1]">
                {user?.name || "User"}
              </span>
              <ChevronDown
                size={14}
                className={`text-[#FAF3E1]/40 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#2a2a2a] border border-[#F5E7C6]/10 p-2 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-[#F5E7C6]/5 mb-2">
                  <p className="text-xs text-[#FAF3E1]/40 font-medium">
                    Signed in as
                  </p>
                  <p className="text-sm font-bold truncate text-[#FAF3E1]">
                    {user?.email}
                  </p>
                </div>

                <NavLink
                  to="/user/profile"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#FAF3E1]/60 hover:text-[#FA8112] hover:bg-[#FAF3E1]/5 rounded-xl transition-all"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <UserIcon size={18} /> My Profile
                </NavLink>
                <NavLink
                  to="/user/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#FAF3E1]/60 hover:text-[#FA8112] hover:bg-[#FAF3E1]/5 rounded-xl transition-all"
                >
                  <Settings size={18} /> Settings
                </NavLink>

                <div className="h-px bg-[#F5E7C6]/5 my-2" />

                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500/80 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

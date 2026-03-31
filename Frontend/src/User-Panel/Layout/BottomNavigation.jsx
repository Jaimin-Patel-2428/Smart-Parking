import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Map, Ticket, User } from "lucide-react";

const BottomNavigation = () => {
  return (
    <div className="bg-[#222222]/90 backdrop-blur-xl border-t border-[#F5E7C6]/10 flex justify-around items-center py-4 px-2">
      <NavLink
        to="/user/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/30"}`
        }
      >
        <Home size={22} /> <span className="text-[10px] font-bold">Home</span>
      </NavLink>
      <NavLink
        to="/user/find-parking"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/30"}`
        }
      >
        <Map size={22} /> <span className="text-[10px] font-bold">Explore</span>
      </NavLink>
      <NavLink
        to="/user/bookings"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/30"}`
        }
      >
        <Ticket size={22} />{" "}
        <span className="text-[10px] font-bold">Passes</span>
      </NavLink>
      <NavLink
        to="/user/profile"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/30"}`
        }
      >
        <User size={22} />{" "}
        <span className="text-[10px] font-bold">Profile</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigation;

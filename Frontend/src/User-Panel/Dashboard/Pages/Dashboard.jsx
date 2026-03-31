import React from "react";
import { NavLink } from "react-router-dom";
import {
  TrendingUp,
  Car,
  Calendar,
  Wallet,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import useDashboardData from "../Hooks/useDashboardData";
import DashboardStats from "../Components/DashboardStats";
import DashboardCharts from "../Components/DashboardCharts";
import RecentBookings from "../Components/RecentBookings";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-4 md:p-8 animate-pulse space-y-8">
        <div className="h-32 bg-[#FAF3E1]/5 rounded-3xl w-full max-w-xl"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-[#FAF3E1]/5 rounded-3xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-red-500/10 p-6 rounded-full mb-6">
          <MapPin className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#FAF3E1] mb-2">
          Connection Issue
        </h1>
        <p className="text-[#FAF3E1]/40 mb-8 max-w-xs">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#FA8112] text-[#222222] font-bold px-8 py-3 rounded-xl"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-10">
      {/* 1. Hero Welcome Section */}
      <header className="mb-10 px-2">
        <div className="flex flex-col md:flex-row md:items-end px-12 justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tight">
              Hello,{" "}
              <span className="text-[#FA8112]">
                {user?.name?.split(" ")[0] || "User"}
              </span>
            </h1>
            <p className="text-[#FAF3E1]/40 font-medium flex items-center gap-2">
              <Calendar size={16} className="text-[#FA8112]" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <NavLink
            to="/user/find-parking"
            className="flex items-center justify-center gap-2 bg-[#FA8112] text-[#222222] px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-tighter hover:scale-[1.02] transition-all shadow-xl shadow-[#FA8112]/20"
          >
            Find New Spot <ArrowUpRight size={20} />
          </NavLink>
        </div>
      </header>

      {/* 2. Main Stats Grid (Custom Responsive Columns) */}
      <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 px-12 mb-8">
        <DashboardStats stats={data?.stats} />
      </section>

      {/* 3. Interactive Analytics & Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 px-12 gap-8">
        {/* Left: Charts (Occupies 2/3 on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2rem] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-lg font-bold text-[#FAF3E1]">
                Usage Analytics
              </h3>
              <TrendingUp size={20} className="text-[#FA8112]" />
            </div>
            <DashboardCharts stats={data?.stats} />
          </div>
        </div>

        {/* Right: Recent Activity (Occupies 1/3 on desktop) */}
        <div className="space-y-6">
          <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2rem] p-6 h-full">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-lg font-bold text-[#FAF3E1]">
                Recent Passes
              </h3>
              <NavLink
                to="/user/bookings"
                className="text-xs font-bold text-[#FA8112] uppercase tracking-widest"
              >
                See All
              </NavLink>
            </div>
            <RecentBookings recentBookings={data?.recentBookings} />
          </div>
        </div>
      </div>

      {/* 4. Wallet/Promotions Banner (New UI Element) */}
      <div className="mt-8 px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#FA8112] to-[#ff9d42] px-12 p-8 text-[#222222]">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#222222]/10 p-4 rounded-2xl">
                <Wallet size={32} />
              </div>
              <div>
                <h4 className="text-xl font-black leading-tight uppercase tracking-tighter">
                  Instant 10% Discount
                </h4>
                <p className="font-bold opacity-70">
                  Use ParkEase Wallet for your next booking.
                </p>
              </div>
            </div>
            <button className="bg-[#222222] text-[#FAF3E1] px-8 py-3 rounded-xl font-bold text-sm">
              Top Up Now
            </button>
          </div>
          {/* Background Decorative Circle */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

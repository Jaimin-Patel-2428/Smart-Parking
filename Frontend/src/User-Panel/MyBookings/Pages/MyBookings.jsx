import React, { useState } from "react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import { useMyBookings } from "../Hooks/useMyBookings";
import Tabs from "../Components/Tabs";
import BookingCard from "../Components/BookingCard";
import { Hash, Loader2, RefreshCw, Ticket, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    currentBookings,
    upcomingBookings,
    historyBookings,
    loadingCurrent,
    loadingUpcoming,
    loadingHistory,
    extending,
    error,
    fetchCurrent,
    fetchUpcoming,
    fetchHistory,
    extendBooking,
    editBooking,
    cancelBooking,
  } = useMyBookings();

  const [activeTab, setActiveTab] = useState("current");

  const getBookingsForTab = () => {
    switch (activeTab.toLowerCase()) {
      case "current":
        return {
          bookings: currentBookings,
          loading: loadingCurrent,
          fetchFn: fetchCurrent,
        };
      case "upcoming":
        return {
          bookings: upcomingBookings,
          loading: loadingUpcoming,
          fetchFn: fetchUpcoming,
        };
      case "history":
        return {
          bookings: historyBookings,
          loading: loadingHistory,
          fetchFn: fetchHistory,
        };
      default:
        return { bookings: [], loading: false, fetchFn: () => {} };
    }
  };

  const { bookings, loading, fetchFn } = getBookingsForTab();

  const handleRefresh = () => {
    fetchFn();
  };

  const EmptyState = ({ type }) => (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-[#FAF3E1]/[0.02] border border-dashed border-[#F5E7C6]/10 rounded-[2.5rem] text-center">
      <div className="bg-[#FAF3E1]/5 p-6 rounded-full mb-6">
        <Ticket className="h-12 w-12 text-[#FAF3E1]/20" />
      </div>
      <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter mb-2">
        {type === "current" ? "No Active Parking" : "Nothing Found Here"}
      </h3>
      <p className="text-[#FAF3E1]/30 text-sm max-w-xs mx-auto mb-8">
        {type === "current"
          ? "You don't have any vehicle parked right now."
          : "Your booking records will appear here once you make a reservation."}
      </p>
      <button
        onClick={() => navigate("/user/find-parking")}
        className="bg-[#FA8112] text-[#222222] font-black px-8 py-3 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#FA8112]/20"
      >
        Find Parking
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pb-24">
      {/* 1. Header Section */}
      <header className="mb-18 mt-8 px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tight">
              My <span className="text-[#FA8112]">Passes</span>
            </h1>
          </div>
          <p className="text-[#FAF3E1]/40 font-bold flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] ml-14">
            Manage your digital entry permits
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-3 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-6 py-3 rounded-2xl text-[#FAF3E1] font-bold text-xs uppercase tracking-widest hover:bg-[#FAF3E1]/[0.08] transition-all disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 text-[#FA8112] ${loading ? "animate-spin" : ""}`}
          />
          Sync Data
        </button>
      </header>

      {/* 2. Glass Tabs Section */}
      <div className="mb-8 pl-12 overflow-x-auto no-scrollbar">
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={["Current", "Upcoming", "History"]}
          className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 p-2 rounded-2xl inline-flex min-w-full md:min-w-0"
        />
      </div>

      {/* 3. Dynamic Content Area */}
      <div className="relative min-h-[400px]">
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] text-center">
            <p className="text-red-400 font-bold mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="text-[#FAF3E1] text-xs font-black underline uppercase"
            >
              Retry Sync
            </button>
          </div>
        ) : loading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#FA8112]" />
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState type={activeTab.toLowerCase()} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onExtend={extendBooking}
                onEdit={editBooking}
                onCancel={cancelBooking}
                isCurrent={activeTab.toLowerCase() === "current"}
                isUpcoming={activeTab.toLowerCase() === "upcoming"}
                extendingId={extending ? booking._id : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

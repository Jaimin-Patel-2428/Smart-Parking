import React from "react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import { useBookings } from "../Hooks/useBookings";
import {
  MapPin,
  Hash,
  Receipt,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookings, loading } = useBookings(user?._id);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-[#FA8112]" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20 italic">
          Retrieving Ledger...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* 1. Header Section */}
      <header className="mb-12 px-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#FA8112]/10 p-2 rounded-xl">
              <Receipt className="text-[#FA8112]" size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tight italic uppercase">
              Past <span className="text-[#FA8112]">Logs</span>
            </h1>
          </div>
          <p className="text-[#FAF3E1]/30 font-bold flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] ml-12 italic">
            A comprehensive record of your parking activity
          </p>
        </div>

        <div className="bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-6 py-3 rounded-2xl">
          <p className="text-[9px] font-black uppercase text-[#FAF3E1]/20 tracking-widest leading-none mb-1">
            Total Entries
          </p>
          <p className="text-xl font-black text-[#FAF3E1] italic leading-none">
            {bookings.length}
          </p>
        </div>
      </header>

      {/* 2. List Area */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 px-6 bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/10 rounded-[3rem] text-center">
          <div className="bg-[#FAF3E1]/5 p-6 rounded-full mb-6 text-[#FAF3E1]/10">
            <Hash size={40} />
          </div>
          <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
            Archive Empty
          </h3>
          <button
            onClick={() => navigate("/user/find-parking")}
            className="mt-6 text-[#FA8112] text-xs font-black uppercase tracking-widest hover:underline"
          >
            Start your first session →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="group relative overflow-hidden bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2rem] p-6 transition-all hover:bg-[#FAF3E1]/[0.05] hover:border-[#FA8112]/20"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
                {/* Left: Metadata */}
                <div className="flex items-center gap-5">
                  {/* Date Square */}
                  <div className="h-16 w-16 bg-[#222222] border border-[#F5E7C6]/10 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-xl">
                    <span className="text-xl font-black text-[#FAF3E1] italic leading-none">
                      {format(new Date(booking.startTime), "dd")}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#FA8112]">
                      {format(new Date(booking.startTime), "MMM")}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-black text-[#FAF3E1] italic uppercase tracking-tight text-lg group-hover:text-[#FA8112] transition-colors">
                      {booking.parking?.name || "Smart Parking"}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#FA8112]/50" />{" "}
                        {booking.parking?.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Technical Stats */}
                <div className="flex items-center justify-between md:justify-end gap-10 pt-4 md:pt-0 border-t md:border-t-0 border-[#F5E7C6]/5">
                  <div className="text-center md:text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
                      Assigned Slot
                    </p>
                    <p className="text-sm font-black text-[#FAF3E1] italic uppercase tracking-tighter">
                      <Hash
                        size={12}
                        className="inline mr-1 text-[#FA8112]/50"
                      />
                      {booking.slot?.label || "---"}
                    </p>
                  </div>

                  <div className="text-center md:text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
                      Transaction
                    </p>
                    <p className="text-xl font-black text-[#FAF3E1] italic tracking-tighter">
                      ₹{Number(booking.totalAmount).toFixed(2)}
                    </p>
                  </div>

                  <div className="hidden md:block">
                    <button className="p-3 bg-[#FAF3E1]/5 rounded-xl text-[#FAF3E1]/20 group-hover:text-[#FA8112] transition-all">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Background Glow Effect */}
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-40 h-40 bg-[#FA8112] opacity-0 blur-[80px] group-hover:opacity-5 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;

import React from "react";
import { Calendar, ChevronRight, Hash, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentBookings = ({ recentBookings }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "active":
        return "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20 animate-pulse";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#FAF3E1]/10";
    }
  };

  if (!recentBookings || recentBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#FAF3E1]/[0.01] rounded-[2rem] border border-dashed border-[#F5E7C6]/10">
        <div className="bg-[#FAF3E1]/5 p-4 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-[#FAF3E1]/20" />
        </div>
        <p className="text-[#FAF3E1]/60 font-bold">No activity yet</p>
        <p className="text-[#FAF3E1]/20 text-xs">
          Your booking history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentBookings.slice(0, 5).map((booking, index) => (
        <div
          key={booking._id}
          onClick={() => navigate(`/user/bookings/${booking._id}`)}
          className="group relative overflow-hidden flex items-center justify-between p-4 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-2xl transition-all hover:bg-[#FAF3E1]/[0.05] hover:border-[#FA8112]/30 cursor-pointer"
        >
          {/* Subtle Progress Bar Background */}
          <div className="absolute left-0 top-0 h-full w-1 bg-[#FA8112] opacity-0 group-hover:opacity-100 transition-all" />

          <div className="flex items-center gap-4">
            {/* Date Square - Refined Glass Look */}
            <div className="h-14 w-14 bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-xl flex flex-col items-center justify-center">
              <span className="text-lg font-black text-[#FAF3E1] leading-none italic">
                {new Date(booking.createdAt).getDate()}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#FA8112]">
                {new Date(booking.createdAt).toLocaleString("en", {
                  month: "short",
                })}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-black text-[#FAF3E1] italic text-sm md:text-base uppercase tracking-tight">
                  {booking.parking?.name || "General Parking"}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <MapPin size={10} className="text-[#FA8112]" />{" "}
                  {booking.slot?.label || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Hash size={10} className="text-[#FA8112]" />{" "}
                  {booking.qrNumber || "---"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-lg font-black text-[#FAF3E1] italic leading-none">
              ₹{Number(booking.totalAmount).toFixed(2)}
            </span>
            <div
              className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${getStatusStyle(booking.status)}`}
            >
              {booking.status || "Unknown"}
            </div>
          </div>

          {/* Floating Hover Arrow */}
          <div className="hidden md:flex opacity-0 group-hover:opacity-100 -mr-2 group-hover:mr-1 transition-all text-[#FA8112]">
            <ChevronRight size={20} />
          </div>
        </div>
      ))}

      {recentBookings.length > 5 && (
        <button
          onClick={() => navigate("/user/bookings")}
          className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-colors"
        >
          View Full History
        </button>
      )}
    </div>
  );
};

export default RecentBookings;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  QrCode,
  Download,
  Share2,
  Home,
  MapPin,
  Car,
  Hash,
  ArrowRight,
} from "lucide-react";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  // Guard clause for direct URL access
  if (!booking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-[#FA8112]/10 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-12 h-12 text-[#FA8112]" />
        </div>
        <h1 className="text-2xl font-black text-[#FAF3E1] italic uppercase">
          Entry Pass Active
        </h1>
        <p className="text-[#FAF3E1]/40 mt-2 mb-8">
          Your reservation is confirmed. Head to your dashboard to view it.
        </p>
        <button
          onClick={() => navigate("/user/dashboard")}
          className="bg-[#FA8112] text-[#222222] font-black px-10 py-4 rounded-2xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FA8112]/20"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* 1. Success Header */}
      <div className="text-center mb-10">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 blur-2xl bg-emerald-500/30 animate-pulse rounded-full" />
          <div className="relative h-20 w-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="text-4xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
          Slot <span className="text-[#FA8112]">Secured</span>
        </h1>
        <p className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.3em] mt-2">
          Digital Permit Generated Successfully
        </p>
      </div>

      {/* 2. The Digital Permit (Pass Style) */}
      <div className="relative mb-10">
        {/* Pass Top Section */}
        <div className="bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-t-[2.5rem] p-8 pb-10 border-b-0">
          <div className="flex flex-col items-center space-y-8">
            {/* High-Contrast QR Area */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#FA8112] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative p-6 bg-white rounded-3xl shadow-2xl">
                <QrCode
                  size={180}
                  className="text-[#222222]"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20">
                Authorized Entry Pass
              </p>
              <h2 className="text-3xl font-black text-[#FAF3E1] tracking-[0.1em] italic">
                {booking.qrNumber || "PRK-9902"}
              </h2>
            </div>
          </div>
        </div>

        {/* 3. Perforated Divider (The Notch) */}
        <div className="relative flex items-center justify-between px-4 overflow-hidden">
          <div className="absolute left-0 w-full border-t-2 border-dashed border-[#F5E7C6]/10" />
          <div className="z-10 -ml-8 h-8 w-8 bg-[#222222] rounded-full border-r border-[#F5E7C6]/10" />
          <div className="z-10 -mr-8 h-8 w-8 bg-[#222222] rounded-full border-l border-[#F5E7C6]/10" />
        </div>

        {/* Pass Bottom Section */}
        <div className="bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-b-[2.5rem] p-8 pt-10 border-t-0">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase tracking-widest text-[#FA8112]">
                Vehicle
              </p>
              <p className="text-sm font-black text-[#FAF3E1] uppercase flex items-center gap-2 italic">
                <Car size={14} className="opacity-30" />{" "}
                {booking.vehicleNumber || "GJ-01-AB-1234"}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[8px] font-black uppercase tracking-widest text-[#FA8112]">
                Parking Slot
              </p>
              <p className="text-sm font-black text-[#FAF3E1] uppercase flex items-center justify-end gap-2 italic">
                <Hash size={14} className="opacity-30" />{" "}
                {booking.slot?.label || "A-12"}
              </p>
            </div>
            <div className="col-span-2 space-y-1 pt-2">
              <p className="text-[8px] font-black uppercase tracking-widest text-[#FA8112]">
                Parking Zone
              </p>
              <p className="text-sm font-black text-[#FAF3E1] uppercase flex items-center gap-2 italic truncate">
                <MapPin size={14} className="opacity-30" />{" "}
                {booking.parking?.name || "Premium Underground"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Actions Area */}
      <div className="grid grid-cols-1 gap-4 px-2">
        <button
          onClick={() => navigate("/user/dashboard")}
          className="w-full flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#FA8112]/20"
        >
          Return to Console <Home size={18} />
        </button>

        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 text-[#FAF3E1]/60 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FAF3E1]/10 transition-all">
            <Download size={16} /> Save Pass
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 text-[#FAF3E1]/60 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FAF3E1]/10 transition-all">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

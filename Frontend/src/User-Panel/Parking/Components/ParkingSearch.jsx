import React from "react";
import { Search, MapPin, Navigation, Compass } from "lucide-react";

const ParkingSearch = ({ onSearch }) => {
  return (
    <div className="relative w-full group">
      {/* Background Decorative Blur - Follows the search bar */}
      <div className="absolute -inset-1 bg-[#FA8112]/5 blur-2xl rounded-[2.5rem] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative flex flex-col md:flex-row gap-4">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
            <MapPin
              className="text-[#FA8112] drop-shadow-[0_0_8px_rgba(250,129,18,0.4)]"
              size={20}
            />
            <div className="h-4 w-px bg-[#F5E7C6]/10" />
          </div>

          <input
            type="text"
            placeholder="Search by area, mall, or landmark..."
            className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-[1.5rem] py-5 pl-16 pr-6 text-sm font-bold text-[#FAF3E1] italic placeholder:text-[#FAF3E1]/20 placeholder:not-italic focus:outline-none focus:border-[#FA8112]/50 focus:bg-[#FAF3E1]/[0.06] transition-all shadow-2xl"
            onChange={(e) => onSearch(e.target.value)}
          />

          {/* Subtle Shortcut Hint (Visual Polish) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FAF3E1]/5 border border-[#F5E7C6]/10">
            <span className="text-[8px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
              Global Scan
            </span>
          </div>
        </div>

        {/* Near Me / GPS Button */}
        <button className="relative overflow-hidden flex items-center justify-center gap-3 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 text-[#FAF3E1]/60 px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FA8112] hover:text-[#222222] hover:border-[#FA8112] transition-all shadow-xl group/btn active:scale-95">
          <Navigation
            size={16}
            className="group-hover/btn:animate-pulse -rotate-45"
          />
          <span>Near Me</span>

          {/* Decorative Shine Effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 group-hover/btn:animate-[shine_1.5s_infinite]" />
        </button>
      </div>

      {/* Results Subtext */}
      <div className="mt-4 ml-6 flex items-center gap-2">
        <Compass size={12} className="text-[#FA8112] opacity-40" />
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/10 italic">
          Indexing live parking coordinates...
        </span>
      </div>
    </div>
  );
};

export default ParkingSearch;

import React from "react";
import { Clock, Calendar, ArrowRight } from "lucide-react";

const DurationSelector = ({ onChange }) => {
  return (
    <div className="relative group overflow-hidden bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2rem] p-6 transition-all hover:bg-[#FAF3E1]/[0.04]">
      {/* Background Decorative Glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#FA8112] opacity-5 blur-3xl rounded-full" />

      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        {/* Arrival Input */}
        <div className="w-full space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
            <Clock size={12} strokeWidth={3} /> Arrival
          </label>
          <div className="relative group/input">
            <input
              type="datetime-local"
              onChange={(e) => onChange("startTime", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-2xl py-4 px-5 text-sm font-black text-[#FAF3E1] italic focus:outline-none focus:border-[#FA8112]/50 focus:ring-4 focus:ring-[#FA8112]/5 transition-all appearance-none"
            />
          </div>
        </div>

        {/* Tactical Connector Icon */}
        <div className="hidden md:flex items-center justify-center mt-6">
          <div className="bg-[#FA8112]/10 p-2 rounded-full border border-[#FA8112]/20">
            <ArrowRight size={14} className="text-[#FA8112]" />
          </div>
        </div>

        {/* Departure Input */}
        <div className="w-full space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
            <Calendar size={12} strokeWidth={3} /> Departure
          </label>
          <div className="relative group/input">
            <input
              type="datetime-local"
              onChange={(e) => onChange("endTime", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-2xl py-4 px-5 text-sm font-black text-[#FAF3E1] italic focus:outline-none focus:border-[#FA8112]/50 focus:ring-4 focus:ring-[#FA8112]/5 transition-all appearance-none"
            />
          </div>
        </div>
      </div>

      {/* Logic Note */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#F5E7C6]/5" />
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/10">
          Precision Time Sync Enabled
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#F5E7C6]/5" />
      </div>
    </div>
  );
};

export default DurationSelector;

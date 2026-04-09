import React from "react";
import { Timer, Layers, SlidersHorizontal, Info } from "lucide-react";

const ParkingPreferences = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange("preferences", { ...settings.preferences, [key]: value });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Default Duration Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
            <Timer size={12} strokeWidth={3} /> Default Session
          </label>
          <div className="relative group">
            <input
              type="number"
              placeholder="0"
              value={settings.preferences?.defaultDuration || ""}
              onChange={(e) => handleChange("defaultDuration", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-black text-[#FAF3E1] italic focus:outline-none focus:border-[#FA8112]/50 focus:ring-4 focus:ring-[#FA8112]/5 transition-all appearance-none"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
              Hours
            </div>
          </div>
        </div>

        {/* 2. Preferred Floor Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
            <Layers size={12} strokeWidth={3} /> Preferred Level
          </label>
          <div className="relative group">
            <input
              type="text"
              placeholder="e.g. Basement 1"
              value={settings.preferences?.preferredFloor || ""}
              onChange={(e) => handleChange("preferredFloor", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-black text-[#FAF3E1] italic focus:outline-none focus:border-[#FA8112]/50 focus:ring-4 focus:ring-[#FA8112]/5 transition-all appearance-none placeholder:opacity-10"
            />
            <SlidersHorizontal
              size={14}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10"
            />
          </div>
        </div>
      </div>

      {/* 3. Logic Note */}
      <div className="bg-[#FAF3E1]/2 border border-dashed border-[#F5E7C6]/10 p-4 rounded-2xl flex gap-3">
        <Info size={16} className="text-[#FA8112]/40 shrink-0 mt-0.5" />
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/30 leading-relaxed">
          These presets will be automatically applied to your new bookings to
          accelerate the checkout protocol.
        </p>
      </div>
    </div>
  );
};

export default ParkingPreferences;

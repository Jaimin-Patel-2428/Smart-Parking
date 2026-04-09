import React from "react";
import { Moon, Globe, CheckCircle2, Monitor } from "lucide-react";

const AppPreferences = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange("appSettings", { ...settings.appSettings, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* 1. Dark Mode / Theme Toggle */}
      <div className="flex items-center justify-between p-4 bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-2xl group hover:border-[#FA8112]/20 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FA8112]/10 rounded-xl text-[#FA8112] shadow-inner">
            <Moon size={18} />
          </div>
          <div>
            <p className="text-xs font-black text-[#FAF3E1] uppercase tracking-widest italic">
              Interface Theme
            </p>
            <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-tighter">
              Force High-Contrast Dark Mode
            </p>
          </div>
        </div>

        {/* Tactical Switch */}
        <button
          onClick={() =>
            handleChange("darkMode", !settings.appSettings?.darkMode)
          }
          className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
            settings.appSettings?.darkMode ? "bg-[#FA8112]" : "bg-[#FAF3E1]/10"
          }`}
        >
          <div
            className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-[#222222] transition-all duration-300 shadow-lg ${
              settings.appSettings?.darkMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* 2. Language Selection Field */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
          <Globe size={12} strokeWidth={3} /> Localization
        </label>

        <div className="relative group">
          <input
            type="text"
            placeholder="Select System Language"
            value={settings.appSettings?.language || ""}
            onChange={(e) => handleChange("language", e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-black text-[#FAF3E1] italic focus:outline-none focus:border-[#FA8112]/50 focus:ring-4 focus:ring-[#FA8112]/5 transition-all appearance-none placeholder:opacity-20"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-[8px] font-black text-[#FA8112] uppercase tracking-widest bg-[#FA8112]/10 px-2 py-1 rounded-md">
              EN-US
            </span>
          </div>
        </div>
      </div>

      {/* 3. System Status Indicator */}
      <div className="pt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/10">
        <Monitor size={12} /> Rendering Engine: v3.0-Stable
      </div>
    </div>
  );
};

export default AppPreferences;

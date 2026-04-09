import React from "react";
import { BellRing, Clock, ShieldCheck, TimerReset } from "lucide-react";

const ReminderSettings = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange("reminders", { ...settings.reminders, [key]: value });
  };

  const isEnabled = settings.reminders?.reminderEnabled || false;

  return (
    <div className="space-y-6">
      {/* 1. Master Activation Switch */}
      <div
        className={`p-5 rounded-2xl border transition-all duration-500 ${
          isEnabled
            ? "bg-[#FA8112]/5 border-[#FA8112]/30 shadow-lg shadow-[#FA8112]/5"
            : "bg-[#FAF3E1]/2 border-[#F5E7C6]/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl transition-all ${
                isEnabled
                  ? "bg-[#FA8112] text-[#222222]"
                  : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20"
              }`}
            >
              <BellRing size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black text-[#FAF3E1] uppercase tracking-widest italic">
                Temporal Alerts
              </p>
              <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-tighter">
                Enable proximity alerts for active sessions
              </p>
            </div>
          </div>

          {/* Premium Toggle */}
          <button
            onClick={() => handleChange("reminderEnabled", !isEnabled)}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              isEnabled ? "bg-[#FA8112]" : "bg-[#FAF3E1]/10"
            }`}
          >
            <div
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-[#222222] transition-all duration-300 ${
                isEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. Precision Timing Input */}
      <div
        className={`space-y-3 transition-all duration-500 ${isEnabled ? "opacity-100 translate-y-0" : "opacity-20 pointer-events-none -translate-y-2"}`}
      >
        <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
          <TimerReset size={12} strokeWidth={3} /> Alert Lead Time
        </label>

        <div className="relative group">
          <input
            type="number"
            placeholder="15"
            value={settings.reminders?.reminderTime || ""}
            onChange={(e) => handleChange("reminderTime", e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-black text-[#FAF3E1] italic focus:outline-none focus:border-[#FA8112]/50 focus:ring-4 focus:ring-[#FA8112]/5 transition-all appearance-none"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="h-4 w-px bg-[#F5E7C6]/10 mr-2" />
            <span className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
              Minutes
            </span>
          </div>
        </div>
      </div>

      {/* 3. Status Footer */}
      <div className="pt-2 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/10">
        <ShieldCheck size={12} /> Sync Status: Optimized for Real-time Delivery
      </div>
    </div>
  );
};

export default ReminderSettings;

import React from "react";
import { Car, CheckCircle2, ShieldCheck, Hash } from "lucide-react";

const VehicleSelector = ({ selectedVehicle, onSelect, vehicles = [] }) => {
  return (
    <div className="space-y-4">
      {/* 1. Technical Label */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FA8112] italic flex items-center gap-2">
          <Car size={14} /> Registered Assets
        </h3>
        <span className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
          {vehicles.length} Unit(s) Found
        </span>
      </div>

      {/* 2. Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vehicles.map((v, index) => {
          const isActive = selectedVehicle === v;

          return (
            <button
              key={index}
              onClick={() => onSelect(v)}
              className={`group relative overflow-hidden flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-300 ${
                isActive
                  ? "bg-[#FA8112]/10 border-[#FA8112] shadow-xl shadow-[#FA8112]/5"
                  : "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/5 hover:bg-[#FAF3E1]/[0.05] hover:border-[#F5E7C6]/20"
              }`}
            >
              {/* Asset Details */}
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className={`p-2.5 rounded-xl transition-colors ${
                    isActive
                      ? "bg-[#FA8112] text-[#222222]"
                      : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 group-hover:text-[#FAF3E1]/40"
                  }`}
                >
                  <Hash size={16} strokeWidth={3} />
                </div>

                <div className="text-left space-y-0.5">
                  <p
                    className={`text-xs font-black uppercase tracking-widest transition-colors ${
                      isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/20"
                    }`}
                  >
                    License Plate
                  </p>
                  <span
                    className={`text-lg font-black italic tracking-tighter transition-colors ${
                      isActive ? "text-[#FAF3E1]" : "text-[#FAF3E1]/60"
                    }`}
                  >
                    {v}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="relative z-10">
                {isActive ? (
                  <div className="bg-[#FA8112] text-[#222222] p-1 rounded-full animate-in zoom-in duration-300">
                    <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="h-2 w-2 rounded-full bg-[#FAF3E1]/10 group-hover:bg-[#FAF3E1]/30 transition-all" />
                )}
              </div>

              {/* Decorative Background Icon */}
              <Car
                className={`absolute -right-4 -bottom-4 w-16 h-16 transition-opacity pointer-events-none ${
                  isActive ? "text-[#FA8112] opacity-10" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 3. Empty State Guard */}
      {vehicles.length === 0 && (
        <div className="bg-red-500/5 border border-dashed border-red-500/20 p-6 rounded-[1.5rem] flex items-center justify-center gap-3">
          <ShieldCheck size={18} className="text-red-500/50" />
          <p className="text-[10px] font-black uppercase tracking-widest text-red-500/60">
            No active vehicle linked to profile
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;

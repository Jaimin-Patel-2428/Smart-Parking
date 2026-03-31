import React from "react";
import { Lock, Ban, CheckCircle2, LayoutGrid, Zap } from "lucide-react";

const SlotGrid = ({ slots, selectedSlot, onSelect, isTimeSelected }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
      {slots.map((slot) => {
        const isSelected = selectedSlot?._id === slot._id;
        const hasValidTime = slot.isAvailableForTime !== undefined;
        const slotStatus = slot.status?.toLowerCase();

        // Logical Checks
        const isOccupied =
          slotStatus === "occupied" ||
          slotStatus === "maintenance" ||
          (hasValidTime && !slot.isAvailableForTime);
        const isLocked =
          slotStatus === "locked" ||
          slot.status === "temporary_locked" ||
          (hasValidTime &&
            !slot.isAvailableForTime &&
            slotStatus !== "occupied");
        const timeSelected = isTimeSelected || hasValidTime;
        const displayLocked = !timeSelected || isLocked;

        const getButtonStyles = () => {
          if (isSelected)
            return "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-[0_0_20px_rgba(250,129,18,0.3)] scale-105 z-10 ring-2 ring-[#FA8112]/20";
          if (isOccupied)
            return "bg-red-500/5 border-red-500/20 opacity-40 cursor-not-allowed";
          if (displayLocked)
            return "bg-amber-500/5 border-amber-500/10 opacity-30 cursor-not-allowed grayscale";
          return "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/10 hover:border-[#FA8112]/50 hover:bg-[#FAF3E1]/[0.05] group/slot";
        };

        return (
          <button
            key={slot._id}
            disabled={!timeSelected || isOccupied || isLocked}
            onClick={() => onSelect(slot)}
            className={`relative h-20 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${getButtonStyles()}`}
          >
            {/* Slot Label */}
            <span
              className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
                isSelected
                  ? "text-[#222222]"
                  : "text-[#FAF3E1]/30 group-hover/slot:text-[#FAF3E1]"
              }`}
            >
              {slot.label}
            </span>

            {/* Dynamic Status Icon */}
            <div className="relative">
              {isOccupied ? (
                <Ban size={14} className="text-red-500/40" />
              ) : displayLocked ? (
                <Lock size={14} className="text-amber-500/20" />
              ) : isSelected ? (
                <CheckCircle2
                  size={16}
                  strokeWidth={3}
                  className="animate-in zoom-in duration-300"
                />
              ) : (
                <Zap
                  size={14}
                  className="text-[#FA8112]/20 group-hover/slot:text-[#FA8112] transition-colors"
                />
              )}
            </div>

            {/* Bottom Cyber-Indicator */}
            <div className="absolute bottom-2 left-3 right-3 h-[1.5px] rounded-full overflow-hidden bg-white/5">
              <div
                className={`h-full transition-all duration-500 ${
                  isSelected
                    ? "bg-[#222222] w-full"
                    : isOccupied
                      ? "bg-red-500 w-full"
                      : displayLocked
                        ? "bg-amber-500 w-1/3"
                        : "bg-[#FA8112]/10 group-hover/slot:bg-[#FA8112] group-hover/slot:w-full w-0"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SlotGrid;

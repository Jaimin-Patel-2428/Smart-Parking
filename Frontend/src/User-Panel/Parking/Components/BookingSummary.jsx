import React from "react";
import { ShieldCheck, Info, Timer, LayoutGrid, Banknote } from "lucide-react";

const BookingSummary = ({ parking, slot, duration, total }) => {
  return (
    <div className="space-y-6">
      {/* 1. Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <LayoutGrid size={12} className="text-[#FA8112]" />
            <p className="text-[9px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
              Slot ID
            </p>
          </div>
          <p className="text-lg font-black text-[#FA8112] italic leading-none">
            {slot?.label || "---"}
          </p>
        </div>

        <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <Timer size={12} className="text-[#FA8112]" />
            <p className="text-[9px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
              Duration
            </p>
          </div>
          <p className="text-lg font-black text-[#FAF3E1] italic leading-none">
            {duration || 0}{" "}
            <span className="text-[10px] not-italic opacity-40">HRS</span>
          </p>
        </div>
      </div>

      {/* 2. Buffer Info Chip */}
      <div className="bg-[#FA8112]/5 p-4 rounded-2xl border border-[#FA8112]/10 flex gap-4 text-[10px] text-[#FA8112]/80 font-bold leading-relaxed">
        <Info size={18} className="shrink-0 opacity-60" />
        <p>
          A <span className="text-[#FA8112] font-black">30-minute buffer</span>{" "}
          is automatically applied to ensure your spot is vacant and sanitized
          upon arrival.
        </p>
      </div>

      {/* 3. High-Contrast Price Ledger */}
      <div className="pt-6 border-t border-[#F5E7C6]/5">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] italic">
              <Banknote size={12} /> Final Amount
            </div>
            <h2 className="text-4xl font-black text-[#FAF3E1] tracking-tighter italic leading-none">
              ₹{total?.toFixed(2)}
            </h2>
          </div>

          <div className="text-right pb-1">
            <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest mb-1">
              Base Tariff
            </p>
            <div className="px-3 py-1 bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-lg">
              <span className="text-xs font-black text-[#FA8112] italic">
                ₹{parking?.basePrice || 0}
                <span className="text-[10px] not-italic opacity-40 ml-1">
                  /HR
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Security Seal */}
      <div className="flex items-center justify-center pt-2">
        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/10">
          <ShieldCheck size={12} /> Encrypted Transaction Channel
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;

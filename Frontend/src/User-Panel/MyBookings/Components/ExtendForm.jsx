import React, { useState } from "react";
import { Clock, Plus, X, ChevronRight, Zap } from "lucide-react";

const ExtendForm = ({ bookingId, onExtend, disabled }) => {
  const [hours, setHours] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleExtend = () => {
    onExtend(bookingId, hours);
    setShowModal(false);
  };

  const hourOptions = [1, 2, 4, 6, 8];

  return (
    <>
      {/* 1. Trigger Button - Styled as a Compact Action Chip */}
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className="group mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#FA8112] transition-all hover:bg-[#FA8112] hover:text-[#222222] hover:shadow-lg hover:shadow-[#FA8112]/20 disabled:opacity-30"
      >
        <Plus
          size={14}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
        Extend Pass
      </button>

      {/* 2. Premium Glass Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-[#222222]/60 animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#1a1a1a] p-8 shadow-2xl">
            {/* Background Decorative Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FA8112] opacity-10 blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-[#FA8112]/10 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-[#FA8112]" />
                </div>
                <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
                  Add Time
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#FAF3E1]/20 hover:text-[#FAF3E1]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chip Selection Logic */}
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-4 ml-1">
                  Select Duration
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {hourOptions.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHours(h)}
                      className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                        hours === h
                          ? "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/20"
                          : "bg-[#FAF3E1]/5 border-[#F5E7C6]/5 text-[#FAF3E1]/40 hover:border-[#FA8112]/40"
                      }`}
                    >
                      {h}H
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Box */}
              <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#FAF3E1]/60">
                  <Zap size={16} className="text-[#FA8112]" />
                  <span className="text-xs font-bold uppercase tracking-widest italic">
                    New Expiry
                  </span>
                </div>
                <span className="text-sm font-black text-[#FAF3E1] italic">
                  +{hours} Hours
                </span>
              </div>

              {/* Final Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleExtend}
                  disabled={disabled}
                  className="w-full flex items-center justify-center gap-3 bg-[#FA8112] py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-[#222222] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#FA8112]/20"
                >
                  Confirm Extension <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/20 hover:text-[#FAF3E1]/60 transition-all"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExtendForm;

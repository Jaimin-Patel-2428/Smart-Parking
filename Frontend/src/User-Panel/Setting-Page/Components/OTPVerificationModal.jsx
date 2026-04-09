import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CornerDownLeft,
  KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";

const OTPVerificationModal = ({ onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleValidation = async () => {
    if (otp.length < 4) {
      return toast.error("Invalid Code Format", {
        style: {
          background: "#1a1a1a",
          color: "#ef4444",
          border: "1px solid #ef4444",
        },
      });
    }

    const loadingToast = toast.loading("Verifying Identity...");
    try {
      await onVerify(otp);
      // Success toast is usually handled by the parent step change
      toast.dismiss(loadingToast);
    } catch (err) {
      toast.error("Authorization Failed", { id: loadingToast });
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-6 backdrop-blur-xl bg-[#111111]/90 animate-in fade-in zoom-in duration-300">
      {/* 1. Modal Container */}
      <div className="bg-[#1a1a1a] border border-red-500/20 rounded-[2.5rem] p-10 max-w-sm w-full text-center space-y-10 shadow-[0_0_80px_rgba(239,68,68,0.15)] relative overflow-hidden">
        {/* Background Digital Pulse */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-500 shadow-[0_0_20px_#ef4444]" />

        {/* 2. Header: Security Lock */}
        <div className="space-y-4">
          <div className="h-16 w-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
            <KeyRound size={32} className="animate-pulse" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
              Identity <span className="text-red-500">Lock</span>
            </h1>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20 max-w-50 mx-auto leading-relaxed">
              Enter the 6-digit synchronization code sent to your terminal.
            </p>
          </div>
        </div>

        {/* 3. Terminal Input Area */}
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500/40 group-focus-within:text-red-500 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="text"
              value={otp}
              maxLength={6}
              placeholder="0 0 0 0 0 0"
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl py-5 pl-16 pr-6 text-2xl font-black tracking-[0.5em] text-red-500 placeholder:opacity-10 focus:outline-none focus:border-red-500/50 transition-all text-center"
            />
          </div>

          <button
            onClick={handleValidation}
            className="w-full py-5 bg-red-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all active:scale-95"
          >
            Authorize Access <ShieldCheck size={18} />
          </button>
        </div>

        {/* 4. Footer Help */}
        <div className="pt-6 border-t border-[#F5E7C6]/5 flex flex-col gap-3">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/10">
            Secure Encryption: AES-256 Bit
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest hover:text-red-500 flex items-center gap-2 mx-auto transition-colors"
          >
            <CornerDownLeft size={12} /> Terminate Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;

import React from "react";
import {
  X,
  ShieldAlert,
  MailWarning,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import toast from "react-hot-toast";

const DeleteAccountModal = ({ onSendOTP, onClose }) => {
  const handleSendRequest = async () => {
    const loadingToast = toast.loading("Requesting Security Code...");
    try {
      await onSendOTP();
      toast.success("Code Sent to Registered Email", { id: loadingToast });
    } catch (err) {
      toast.error("Failed to Send Code", { id: loadingToast });
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 backdrop-blur-md bg-[#222222]/80 animate-in fade-in duration-300">
      {/* 1. Modal Container - Heavy Red Glow */}
      <div className="bg-[#1a1a1a] border border-red-500/20 rounded-[2.5rem] p-10 max-w-md w-full text-center space-y-10 shadow-[0_0_60px_rgba(239,68,68,0.1)] relative overflow-hidden group">
        {/* Background Decorative Grid (Visual Polish) */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIWMjB6TTAgMjBoMjB2MjBIMFYyMHoyMCAwaDIwdjIwSDIwVjB6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />

        {/* Close Button */}
        <button
          onClick={() => {
            toast("Protocol Aborted", { icon: "🛡️" });
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF3E1]/5 text-[#FAF3E1]/20 hover:text-white hover:bg-red-500/10 transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* 2. Page Header - "Final Protocol" */}
        <div className="space-y-4">
          <div className="relative inline-block mb-2">
            <div className="absolute inset-0 blur-2xl bg-red-500/30 animate-pulse rounded-full" />
            <div className="relative h-20 w-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center shadow-2xl">
              <ShieldAlert size={40} strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-3xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
            Final <span className="text-red-500">Protocol</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20 mt-2 max-w-xs mx-auto leading-relaxed">
            Identity verification required before proceeding with account
            deactivation.
          </p>
        </div>

        {/* 3. Action Area - Request OTP Button */}
        <div className="space-y-6 pt-4 border-t border-[#F5E7C6]/5">
          <div className="flex justify-between items-center bg-[#FAF3E1]/2 p-6 rounded-2xl border border-[#F5E7C6]/5 group-hover:border-red-500/20 transition-all">
            <div className="flex items-center gap-4 text-left">
              <MailWarning size={20} className="text-red-500/40" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-red-500/40">
                  Step 1
                </p>
                <p className="text-sm font-black text-[#FAF3E1] uppercase italic tracking-tight">
                  Security Lock
                </p>
              </div>
            </div>

            <button
              onClick={handleSendRequest}
              className="px-6 py-3 bg-red-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all active:scale-95"
            >
              Request Code <ArrowRight size={16} />
            </button>
          </div>

          {/* Subtle Secondary Exit Button */}
          <button
            onClick={onClose}
            className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest hover:text-white flex items-center gap-2 mx-auto"
          >
            <CornerDownLeft size={12} /> Abort and Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;

import React from "react";
import { BellRing, Hourglass, Receipt, ShieldCheck } from "lucide-react";

const NotificationSettings = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange("notifications", { ...settings.notifications, [key]: value });
  };

  const ProtocolTile = ({ id, label, icon: Icon, description, checked }) => (
    <div
      onClick={() => handleChange(id, !checked)}
      className={`relative flex flex-col p-5 rounded-3xl border transition-all cursor-pointer group ${
        checked
          ? "bg-[#FA8112]/5 border-[#FA8112]/30 shadow-lg shadow-[#FA8112]/5"
          : "bg-[#FAF3E1]/2 border-[#F5E7C6]/5 hover:bg-[#FAF3E1]/4"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-2.5 rounded-xl transition-all ${
            checked
              ? "bg-[#FA8112] text-[#222222]"
              : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 group-hover:text-[#FAF3E1]/40"
          }`}
        >
          <Icon size={18} strokeWidth={2.5} />
        </div>

        {/* Modern Toggle Switch */}
        <div
          className={`w-8 h-4 rounded-full relative transition-colors ${checked ? "bg-[#FA8112]" : "bg-[#FAF3E1]/10"}`}
        >
          <div
            className={`absolute top-0.5 h-3 w-3 rounded-full bg-[#222222] transition-all ${checked ? "left-4.5" : "left-0.5"}`}
          />
        </div>
      </div>

      <div className="space-y-1">
        <h4
          className={`text-xs font-black uppercase tracking-widest italic ${checked ? "text-[#FAF3E1]" : "text-[#FAF3E1]/40"}`}
        >
          {label}
        </h4>
        <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-tighter leading-tight">
          {description}
        </p>
      </div>

      {/* Background Active Glow */}
      {checked && (
        <div className="absolute inset-0 bg-[#FA8112] opacity-[0.02] blur-xl rounded-full pointer-events-none" />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProtocolTile
          id="bookingAlerts"
          label="Booking Logs"
          description="Real-time confirmation for every spot secured."
          icon={BellRing}
          checked={settings.notifications?.bookingAlerts || false}
        />

        <ProtocolTile
          id="expiryAlerts"
          label="Expiry Sync"
          description="Tactical countdowns for active sessions."
          icon={Hourglass}
          checked={settings.notifications?.expiryAlerts || false}
        />

        <ProtocolTile
          id="paymentAlerts"
          label="Ledger Updates"
          description="Instant billing and transaction receipts."
          icon={Receipt}
          checked={settings.notifications?.paymentAlerts || false}
        />
      </div>

      {/* Security Disclaimer */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#FAF3E1]/1 border border-[#F5E7C6]/5 rounded-xl">
        <ShieldCheck size={14} className="text-[#FA8112]/40" />
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/10">
          All communications are end-to-end encrypted for user privacy.
        </p>
      </div>
    </div>
  );
};

export default NotificationSettings;

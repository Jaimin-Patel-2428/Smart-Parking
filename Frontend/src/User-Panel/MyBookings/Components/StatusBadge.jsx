import React from "react";

const StatusBadge = ({ status, className = "" }) => {
  const getStatusConfig = (s) => {
    const state = s?.toLowerCase();
    switch (state) {
      case "active":
        return {
          bg: "bg-emerald-500/10",
          text: "text-emerald-500",
          border: "border-emerald-500/20",
          label: "Active Session",
          pulse: true,
        };
      case "confirmed":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          border: "border-blue-400/20",
          label: "Confirmed",
        };
      case "completed":
        return {
          bg: "bg-[#FAF3E1]/5",
          text: "text-[#FAF3E1]/40",
          border: "border-[#F5E7C6]/5",
          label: "Completed",
        };
      case "cancelled":
      case "error":
        return {
          bg: "bg-red-500/10",
          text: "text-red-500",
          border: "border-red-500/20",
          label: state === "error" ? "System Error" : "Cancelled",
        };
      case "pending":
        return {
          bg: "bg-amber-500/10",
          text: "text-amber-500",
          border: "border-amber-500/20",
          label: "Pending",
        };
      default:
        return {
          bg: "bg-[#FAF3E1]/5",
          text: "text-[#FAF3E1]/20",
          border: "border-[#F5E7C6]/5",
          label: s || "Unknown",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`
      inline-flex items-center gap-2 px-3 py-1 rounded-lg border 
      text-[9px] font-black uppercase tracking-[0.15em] italic
      ${config.bg} ${config.text} ${config.border} ${className}
    `}
    >
      {/* Dynamic Status Dot */}
      <span
        className={`h-1.5 w-1.5 rounded-full bg-current ${config.pulse ? "animate-pulse" : "opacity-60"}`}
      />

      {config.label}
    </div>
  );
};

export default StatusBadge;

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = "bg-[#FA8112]",
}) => {
  const isPositive = change >= 0;

  return (
    <div className="relative overflow-hidden bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/5 rounded-[2.5rem] p-5 transition-all hover:bg-[#FAF3E1]/[0.06] hover:border-[#FA8112]/30 group h-full flex flex-col justify-between">
      {/* 1. Top Section: Icon & Trend */}
      <div className="flex items-center justify-between mb-10">
        <div
          className={`p-3.5 rounded-2xl ${color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}
        >
          <Icon className="w-5 h-5 text-[#222222]" />
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
              : "bg-red-500/10 text-red-500 border-red-500/10"
          }`}
        >
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {Math.abs(change)}%
        </div>
      </div>

      {/* 2. Bottom Section: Label & Value */}
      <div className="space-y-1">
        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20 truncate">
          {title}
        </h4>
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-black text-[#FAF3E1] tracking-tighter italic leading-none">
            {value}
          </span>

          {/* Subtle Activity Dot */}
          <div
            className={`h-1.5 w-1.5 rounded-full ${color} animate-pulse shadow-[0_0_8px] shadow-[#FA8112]`}
          />
        </div>

        {/* 3. New Minimalist Progress Bar */}
        <div className="mt-4 h-[2px] w-full bg-[#FAF3E1]/5 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} opacity-80 transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(Math.abs(change) + 30, 100)}%` }}
          />
        </div>
      </div>

      {/* Background Decorative Glow */}
      <div
        className={`absolute -right-6 -bottom-6 w-20 h-20 blur-[50px] opacity-20 rounded-full ${color}`}
      />
    </div>
  );
};

export default StatsCard;

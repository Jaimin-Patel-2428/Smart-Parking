import React from "react";
import { TrendingUp } from "lucide-react";

const RevenueChart = ({ data, viewType, setViewType, loading }) => {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="bg-[#FAF3E1]/[0.02] p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm space-y-8 h-full relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA8112]/5 blur-[80px] pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-xl font-black text-[#FAF3E1] flex items-center gap-3 tracking-tighter uppercase">
            <TrendingUp className="text-[#FA8112]" size={24} /> Revenue{" "}
            <span className="text-[#FA8112]">Trends</span>
          </h3>
          <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase tracking-[0.2em] mt-1">
            Financial Intelligence
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-[#FAF3E1]/[0.05] p-1.5 rounded-2xl border border-[#F5E7C6]/5">
          {["daily", "monthly"].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                viewType === type
                  ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/20"
                  : "text-[#FAF3E1]/30 hover:text-[#FAF3E1]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 flex items-end justify-between gap-3 pt-12 relative z-10">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="h-6 w-6 border-2 border-[#FA8112] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#FAF3E1]/20 font-black uppercase tracking-[0.3em] text-[10px]">
              Syncing Ledger...
            </p>
          </div>
        ) : data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center group relative h-full justify-end"
            >
              {/* Tooltip - Styled as Dark Badge */}
              <div className="absolute -top-10 bg-[#FAF3E1] text-[#222222] text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap font-black shadow-xl pointer-events-none z-20 uppercase tracking-tighter">
                ${item.amount.toLocaleString()}
              </div>

              {/* Bar - Tangerine Accent */}
              <div
                className="w-full max-w-[24px] bg-[#FA8112] rounded-t-xl transition-all duration-700 ease-out hover:bg-[#FAF3E1] hover:shadow-[0_0_20px_rgba(250,129,18,0.3)] cursor-crosshair relative"
                style={{
                  height: `${(item.amount / maxAmount) * 100}%`,
                  minHeight: "6px",
                }}
              >
                {/* Visual hardware-style shine */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-xl pointer-events-none" />
              </div>

              {/* Label */}
              <span className="text-[9px] font-black text-[#FAF3E1]/20 mt-4 rotate-45 origin-left uppercase tracking-tighter group-hover:text-[#FA8112] transition-colors">
                {item.label}
              </span>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <p className="text-[#FAF3E1]/10 font-black uppercase tracking-[0.4em] text-xs">
              Void Data Period
            </p>
          </div>
        )}
      </div>

      {/* X-Axis Baseline */}
      <div className="absolute bottom-16 left-8 right-8 h-[1px] bg-[#F5E7C6]/5 pointer-events-none" />
    </div>
  );
};

export default RevenueChart;

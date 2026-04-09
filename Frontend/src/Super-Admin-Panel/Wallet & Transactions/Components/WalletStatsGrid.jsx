import React from "react";
import { IndianRupee, RotateCcw, Users, Activity } from "lucide-react";

const WalletStatsGrid = ({ stats, loading }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  // Skeleton Loader for stats
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-40 bg-[#FAF3E1]/[0.03] animate-pulse rounded-[2.5rem] border border-[#F5E7C6]/5"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <IndianRupee size={22} />,
      color: "text-[#FA8112]",
      bg: "bg-[#FA8112]/10",
      border: "border-[#FA8112]/20",
      trend: "Gross Income",
    },
    {
      title: "Total Refunds",
      value: `₹${stats?.totalRefunds?.toLocaleString() || 0}`,
      icon: <RotateCcw size={22} />,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      trend: "Credits Issued",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <Users size={22} />,
      color: "text-[#FAF3E1]",
      bg: "bg-[#FAF3E1]/10",
      border: "border-[#F5E7C6]/10",
      trend: "Active Wallets",
    },
    {
      title: "System Transactions",
      value: stats?.totalTransactions || 0,
      icon: <Activity size={22} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/20",
      trend: "Total Logs",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#FAF3E1]/[0.02] p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm hover:bg-[#FAF3E1]/[0.04] transition-all duration-300 group relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div
            className={`absolute -right-4 -top-4 w-16 h-16 blur-2xl opacity-20 rounded-full ${card.bg}`}
          />

          <div className="flex justify-between items-start mb-6">
            <div
              className={`p-4 rounded-2xl border transition-all duration-300 group-hover:scale-110 shadow-lg ${card.bg} ${card.color} ${card.border}`}
            >
              {card.icon}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FAF3E1]/[0.05] rounded-full border border-[#F5E7C6]/5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse" />
              <span className="text-[9px] font-black text-[#FAF3E1]/30 uppercase tracking-[0.2em]">
                Live
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-4xl font-black text-[#FAF3E1] tracking-tighter">
              {card.value}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest">
                {card.title}
              </p>
              <span className="h-1 w-1 rounded-full bg-[#FA8112]/40" />
              <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-tighter">
                {card.trend}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletStatsGrid;

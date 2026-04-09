import React from "react";
import { useWalletSummary } from "../Hooks/useWalletSummary";
import { useRevenueCharts } from "../Hooks/useRevenueCharts";
import WalletStatsGrid from "../Components/WalletStatsGrid";
import RevenueChart from "../Components/RevenueChart";
import TopUsersList from "../Components/TopUsersList";
import { RefreshCw, TrendingUp, PieChart } from "lucide-react";

const WalletOverview = () => {
  const { stats, topUsers, parkingRevenue, loading, refresh } =
    useWalletSummary();
  const {
    chartData,
    viewType,
    setViewType,
    loading: chartLoading,
  } = useRevenueCharts();

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="space-y-10 pb-10 bg-[#222222] animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#FAF3E1] tracking-tighter uppercase">
            Financial <span className="text-[#FA8112]">Intelligence</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-2">
            Real-time Monitoring: Revenue • Refunds • Wallet Integrity
          </p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-3 px-8 py-3.5 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 rounded-2xl font-black text-[11px] uppercase tracking-widest text-[#FAF3E1] hover:bg-[#FA8112] hover:text-[#222222] transition-all shadow-xl active:scale-95 group"
        >
          <RefreshCw
            size={18}
            className={`transition-colors ${loading ? "animate-spin text-[#FA8112] group-hover:text-[#222222]" : "text-[#FA8112]"}`}
          />
          Synchronize Data
        </button>
      </div>

      {/* 1. Stats Grid (Revenue, Refunds, Users, Tx) */}
      <WalletStatsGrid stats={stats} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Revenue Analytics Chart (Daily/Monthly) */}
        <div className="lg:col-span-2">
          <RevenueChart
            data={chartData}
            viewType={viewType}
            setViewType={setViewType}
            loading={chartLoading}
          />
        </div>

        {/* 3. Top Spenders List */}
        <div className="lg:col-span-1">
          <TopUsersList users={topUsers} loading={loading} />
        </div>
      </div>

      {/* 4. Parking Location Revenue (Bottom Row) */}
      <div className="bg-[#FAF3E1]/[0.02] p-10 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#FA8112]/5 to-transparent pointer-events-none" />

        <div className="mb-8 flex items-center gap-4 relative z-10">
          <div className="p-3 bg-[#FA8112]/10 rounded-xl border border-[#FA8112]/20">
            <PieChart className="text-[#FA8112]" size={22} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#FAF3E1] uppercase tracking-tighter">
              Revenue By <span className="text-[#FA8112]">Geography</span>
            </h3>
            <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] mt-1">
              Unit Performance Distribution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {parkingRevenue.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FAF3E1]/[0.03] rounded-3xl border border-[#F5E7C6]/5 flex flex-col justify-center hover:bg-[#FAF3E1]/[0.05] transition-colors group"
            >
              <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest truncate">
                {item.parkingName}
              </p>
              <p className="text-2xl font-black text-[#FAF3E1] mt-2 tracking-tighter">
                ${item.totalRevenue.toLocaleString()}
              </p>

              {/* Progress Bar Container */}
              <div className="w-full bg-[#FAF3E1]/[0.05] h-1.5 rounded-full mt-5 overflow-hidden border border-[#F5E7C6]/5">
                <div
                  className="bg-[#FA8112] h-full rounded-full shadow-[0_0_8px_#FA8112]"
                  style={{
                    width: `${(item.totalRevenue / (stats?.totalRevenue || 1)) * 100}%`,
                  }}
                />
              </div>
              <p className="text-[9px] font-black text-[#FAF3E1]/10 uppercase mt-2 text-right">
                {Math.round(
                  (item.totalRevenue / (stats?.totalRevenue || 1)) * 100,
                )}
                % Contribution
              </p>
            </div>
          ))}

          {parkingRevenue.length === 0 && !loading && (
            <div className="col-span-full py-12 text-center">
              <p className="text-[#FAF3E1]/10 font-black uppercase tracking-[0.4em] text-xs">
                Log Empty: Zero Regional Activity
              </p>
            </div>
          )}
        </div>
      </div>

      {/* System Footer Signature */}
      <div className="pt-4 text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/10 uppercase tracking-[0.5em]">
          End-to-End Financial Encryption Active
        </p>
      </div>
    </div>
  );
};

export default WalletOverview;

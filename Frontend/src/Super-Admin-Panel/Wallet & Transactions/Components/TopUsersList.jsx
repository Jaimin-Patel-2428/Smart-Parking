import React from "react";
import { Trophy, Medal, Star } from "lucide-react";

const TopUsersList = ({ users, loading }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const getIcon = (index) => {
    // Ranking colors tuned for dark mode visibility
    if (index === 0)
      return (
        <Trophy
          className="text-[#FA8112] drop-shadow-[0_0_8px_rgba(250,129,18,0.3)]"
          size={20}
        />
      );
    if (index === 1) return <Medal className="text-slate-300" size={20} />;
    if (index === 2) return <Medal className="text-amber-700" size={20} />;
    return <Star className="text-[#FAF3E1]/20" size={18} />;
  };

  return (
    <div className="bg-[#FAF3E1]/[0.02] p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm h-full relative overflow-hidden">
      {/* Decorative Branding Glow */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FA8112]/5 blur-[80px] pointer-events-none" />

      <div className="mb-8 relative z-10">
        <h3 className="text-xl font-black text-[#FAF3E1] uppercase tracking-tighter">
          Top <span className="text-[#FA8112]">Spenders</span>
        </h3>
        <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase tracking-[0.2em] mt-1">
          Revenue Contribution Leaderboard
        </p>
      </div>

      <div className="space-y-4 relative z-10">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-[#FAF3E1]/[0.03] animate-pulse rounded-2xl border border-[#F5E7C6]/5"
            />
          ))
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 bg-[#FAF3E1]/[0.03] rounded-2xl border border-[#F5E7C6]/5 hover:border-[#FA8112]/30 transition-all duration-300 group shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="bg-[#222222] p-3 rounded-xl border border-[#F5E7C6]/10 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {getIcon(index)}
                </div>
                <div>
                  <p className="font-black text-[#FAF3E1] text-sm tracking-tight">
                    {user.fullName}
                  </p>
                  <p className="text-[10px] text-[#FAF3E1]/20 font-black uppercase tracking-widest truncate max-w-[140px] mt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[#FA8112] font-black text-base tracking-tighter">
                  ${user.totalSpent.toLocaleString()}
                </p>
                <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.1em] mt-0.5">
                  Volume
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-[#FAF3E1]/10 font-black uppercase tracking-[0.3em] text-xs italic">
              No Analytics Detected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsersList;

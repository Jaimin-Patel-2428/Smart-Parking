import React from "react";
import { ArrowRight, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserWalletTable = ({ wallets, loading }) => {
  const navigate = useNavigate();

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  if (loading)
    return (
      <div className="p-24 text-center flex flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 border-2 border-[#FA8112] border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em] text-[10px]">
          Syncing Ledger Balances...
        </p>
      </div>
    );

  return (
    <div className="overflow-x-auto bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.2em] font-black px-4">
            <th className="py-3 px-6">User Identity</th>
            <th className="py-3 px-6">Available Credit</th>
            <th className="py-3 px-6">Last Sync</th>
            <th className="py-3 px-6 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((item) => (
            <tr
              key={item._id}
              className="bg-[#FAF3E1]/[0.02] hover:bg-[#FAF3E1]/[0.04] transition-all duration-300 group border border-[#F5E7C6]/10 shadow-sm"
            >
              {/* User Details */}
              <td className="py-5 px-6 rounded-l-[1.5rem]">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#FAF3E1]/[0.05] text-[#FA8112] flex items-center justify-center border border-[#F5E7C6]/5 shadow-inner">
                    <UserCircle size={20} />
                  </div>
                  <div>
                    <p className="font-black text-[#FAF3E1] text-sm tracking-tight">
                      {item.user?.fullName || "System Node"}
                    </p>
                    <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest mt-0.5">
                      {item.user?.email || "No Email Registry"}
                    </p>
                  </div>
                </div>
              </td>

              {/* Current Balance */}
              <td className="py-5 px-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full animate-pulse ${
                      item.balance > 0
                        ? "bg-[#FA8112] shadow-[0_0_8px_#FA8112]"
                        : "bg-rose-500 shadow-[0_0_8px_#F43F5E]"
                    }`}
                  />
                  <p className="font-black text-[#FAF3E1] text-lg tracking-tighter">
                    ${item.balance.toLocaleString()}
                  </p>
                </div>
              </td>

              {/* Last Updated */}
              <td className="py-5 px-6">
                <p className="text-[11px] font-black text-[#FAF3E1]/40 uppercase tracking-tighter">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </p>
                <p className="text-[9px] font-black text-[#FAF3E1]/10 uppercase tracking-widest mt-0.5">
                  Verified Timestamp
                </p>
              </td>

              {/* Actions */}
              <td className="py-5 px-6 text-right rounded-r-[1.5rem]">
                <button
                  onClick={() => navigate(`/admin/users/${item.user?._id}`)}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#FAF3E1]/[0.05] text-[#FAF3E1] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#F5E7C6]/10 hover:bg-[#FA8112] hover:text-[#222222] transition-all shadow-lg active:scale-95 group/btn"
                >
                  Inspect Profile
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserWalletTable;

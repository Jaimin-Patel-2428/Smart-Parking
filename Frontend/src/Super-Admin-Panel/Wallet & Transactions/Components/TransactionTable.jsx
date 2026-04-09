import React from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TransactionTable = ({ transactions, loading }) => {
  const navigate = useNavigate();

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-4 text-[#FAF3E1]/20 font-black uppercase tracking-[0.3em] text-xs animate-pulse">
        <div className="h-8 w-8 border-2 border-[#FA8112] border-t-transparent rounded-full animate-spin" />
        Syncing Ledger Records...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.2em] font-black px-4">
            <th className="py-3 px-6">Entity & ID</th>
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">Amount</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Timestamp</th>
            <th className="py-3 px-6 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx._id}
              className="bg-[#FAF3E1]/[0.02] hover:bg-[#FAF3E1]/[0.04] transition-all duration-300 group border border-[#F5E7C6]/10 shadow-sm"
            >
              {/* Profile & ID */}
              <td className="py-5 px-6 rounded-l-[1.5rem]">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#FAF3E1]/[0.05] flex items-center justify-center text-[#FA8112] border border-[#F5E7C6]/5">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="font-black text-[#FAF3E1] text-sm tracking-tight truncate max-w-[150px]">
                      {tx.user?.fullName || "System Node"}
                    </p>
                    <p className="text-[10px] font-mono text-[#FAF3E1]/20 uppercase tracking-widest mt-0.5">
                      TXN-{tx._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </td>

              {/* Transaction Type */}
              <td className="py-5 px-6">
                <div
                  className={`flex items-center gap-2 font-black text-[9px] uppercase tracking-[0.15em] ${
                    tx.type === "credit" ? "text-cyan-400" : "text-[#FA8112]"
                  }`}
                >
                  {tx.type === "credit" ? (
                    <ArrowUpRight
                      size={14}
                      className="bg-cyan-400/10 rounded-sm"
                    />
                  ) : (
                    <ArrowDownLeft
                      size={14}
                      className="bg-[#FA8112]/10 rounded-sm"
                    />
                  )}
                  {tx.type}
                </div>
              </td>

              {/* Transaction Amount */}
              <td className="py-5 px-6">
                <p
                  className={`font-black text-sm tracking-tighter ${
                    tx.type === "credit" ? "text-cyan-400" : "text-[#FAF3E1]"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}₹
                  {tx.amount.toLocaleString()}
                </p>
              </td>

              {/* Status Badge */}
              <td className="py-5 px-6">
                <span
                  className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border ${
                    tx.status === "success"
                      ? "bg-cyan-400/5 border-cyan-400/20 text-cyan-400"
                      : tx.status === "failed"
                        ? "bg-rose-500/5 border-rose-500/20 text-rose-400"
                        : "bg-amber-400/5 border-amber-400/20 text-amber-400"
                  }`}
                >
                  {tx.status}
                </span>
              </td>

              {/* Date & Time */}
              <td className="py-5 px-6">
                <div className="flex flex-col text-[11px] font-bold text-[#FAF3E1]/60">
                  <span className="flex items-center gap-2">
                    <Calendar size={12} className="text-[#FA8112]" />{" "}
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-[10px] font-black opacity-30 mt-1 uppercase tracking-tighter">
                    {new Date(tx.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </td>

              {/* Action Button */}
              <td className="py-5 px-6 text-right rounded-r-[1.5rem]">
                <button
                  onClick={() => navigate(`/admin/transactions/${tx._id}`)}
                  className="p-3 bg-[#FAF3E1]/[0.05] hover:bg-[#FA8112] text-[#FAF3E1]/20 hover:text-[#222222] rounded-xl transition-all border border-[#F5E7C6]/5"
                >
                  <ExternalLink size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

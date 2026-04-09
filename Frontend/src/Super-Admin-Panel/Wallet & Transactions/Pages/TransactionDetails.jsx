import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transactionService } from "../Services/transactionService";
import {
  ChevronLeft,
  Receipt,
  Printer,
  MapPin,
  Calendar,
  CreditCard,
  User,
  Clock,
} from "lucide-react";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  useEffect(() => {
    transactionService
      .getTransactionById(id)
      .then((res) => setTx(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 border-4 border-[#FA8112] border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em] text-[10px]">
          Decrypting Ledger Entry...
        </p>
      </div>
    );

  if (!tx)
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="bg-rose-500/10 p-6 rounded-full text-rose-500">
          <Receipt size={48} />
        </div>
        <h2 className="text-xl font-black text-[#FAF3E1] uppercase tracking-tighter">
          Transaction <span className="text-rose-500">Not Found</span>
        </h2>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] font-black uppercase tracking-widest text-[10px] transition-all group"
      >
        <ChevronLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Terminal Ledger
      </button>

      <div className="bg-[#FAF3E1]/[0.02] rounded-[3rem] border border-[#F5E7C6]/10 shadow-2xl overflow-hidden relative">
        {/* Receipt Header Style */}
        <div className="p-12 bg-[#FAF3E1]/[0.03] border-b border-dashed border-[#F5E7C6]/10 text-center relative">
          {/* Punch Hole Visuals */}
          <div className="absolute -bottom-4 -left-4 h-8 w-8 bg-[#222222] rounded-full border border-[#F5E7C6]/10" />
          <div className="absolute -bottom-4 -right-4 h-8 w-8 bg-[#222222] rounded-full border border-[#F5E7C6]/10" />

          <div className="h-20 w-20 bg-[#FA8112] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#FA8112]/20 rotate-3">
            <Receipt size={36} className="text-[#222222]" />
          </div>
          <h2 className="text-3xl font-black text-[#FAF3E1] tracking-tighter uppercase">
            Payment <span className="text-[#FA8112]">Manifest</span>
          </h2>
          <p className="text-[10px] font-mono text-[#FAF3E1]/20 mt-3 uppercase tracking-[0.3em]">
            Reference Sequence: {tx._id}
          </p>
        </div>

        {/* Amount Display */}
        <div className="p-12 text-center">
          <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] mb-4">
            Settlement total
          </p>
          <h1
            className={`text-6xl font-black tracking-tighter ${tx.type === "credit" ? "text-cyan-400" : "text-[#FAF3E1]"}`}
          >
            {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
          </h1>
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/5">
            <div
              className={`h-2 w-2 rounded-full ${tx.status === "success" ? "bg-cyan-400 animate-pulse" : "bg-rose-500"}`}
            />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/60">
              LOG STATUS:{" "}
              <span
                className={
                  tx.status === "success" ? "text-cyan-400" : "text-rose-500"
                }
              >
                {tx.status}
              </span>
            </p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="px-12 pb-12 space-y-10">
          <div className="grid grid-cols-2 gap-12 border-t border-[#F5E7C6]/5 pt-10">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest flex items-center gap-2">
                <User size={12} className="text-[#FA8112]" /> Entity Handle
              </label>
              <p className="font-black text-[#FAF3E1] text-lg tracking-tight">
                {tx.user?.fullName || "System Admin"}
              </p>
              <p className="text-xs text-[#FAF3E1]/30 font-medium">
                {tx.user?.email}
              </p>
            </div>
            <div className="space-y-1 text-right md:text-left">
              <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest flex items-center gap-2 md:justify-start justify-end">
                <Clock size={12} className="text-[#FA8112]" /> Timestamp
              </label>
              <p className="font-black text-[#FAF3E1] text-lg tracking-tight">
                {new Date(tx.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-[#FAF3E1]/30 font-medium">
                {new Date(tx.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="p-8 bg-[#FAF3E1]/[0.03] rounded-[2.5rem] border border-[#F5E7C6]/5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 rounded-xl text-[#FA8112]">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
                  Description
                </p>
                <p className="text-sm font-black text-[#FAF3E1]">
                  {tx.description || "Automated Billing Cycle"}
                </p>
              </div>
            </div>

            {tx.booking && (
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 rounded-xl text-[#FA8112]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
                    Asset Location
                  </p>
                  <p className="text-sm font-black text-[#FAF3E1]">
                    {tx.booking.parking?.name}
                  </p>
                  <p className="text-[10px] text-[#FAF3E1]/30 uppercase tracking-[0.2em] mt-0.5">
                    {tx.booking.parking?.location}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-10 bg-[#FAF3E1]/[0.05] border-t border-[#F5E7C6]/5 flex flex-wrap justify-between items-center gap-4">
          <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
            Digital Signature Verified
          </p>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-3 px-8 py-3.5 bg-[#FA8112] text-[#222222] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#FAF3E1] transition-all active:scale-95 shadow-xl shadow-[#FA8112]/10"
          >
            <Printer size={18} /> Output Manifest
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;

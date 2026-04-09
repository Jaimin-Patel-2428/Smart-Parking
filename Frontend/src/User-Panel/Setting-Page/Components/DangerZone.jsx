import React from "react";
import { ShieldAlert, Trash2, AlertTriangle, ChevronRight } from "lucide-react";

const DangerZone = ({ onDelete }) => {
  return (
    <div className="relative overflow-hidden">
      {/* 1. Caution Header Area */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <AlertTriangle size={20} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-red-500 uppercase tracking-widest italic">
            Critical Protocol
          </p>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-tighter leading-relaxed max-w-xs">
            Actions performed here are irreversible. All historical logs,
            vehicle data, and wallet balances will be purged.
          </p>
        </div>
      </div>

      {/* 2. Tactical Delete Action Card */}
      <div className="bg-red-500/3 border border-red-500/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-red-500/5 group">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full border border-red-500/20 flex items-center justify-center text-red-500/40 group-hover:text-red-500 transition-colors">
            <Trash2 size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#FAF3E1] uppercase tracking-tight">
              Deactivate Identity
            </h4>
            <p className="text-[9px] font-bold text-red-500/40 uppercase tracking-widest mt-0.5">
              Termination of all system access
            </p>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="w-full md:w-auto px-8 py-3 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-red-500/5"
        >
          Execute Deletion
        </button>
      </div>

      {/* 3. Security Warning Footer */}
      <div className="mt-8 flex items-center gap-2 px-2 opacity-20 group-hover:opacity-40 transition-opacity">
        <ShieldAlert size={12} className="text-red-500" />
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]">
          Identity Purge Protocol v4.2
        </span>
      </div>
    </div>
  );
};

export default DangerZone;

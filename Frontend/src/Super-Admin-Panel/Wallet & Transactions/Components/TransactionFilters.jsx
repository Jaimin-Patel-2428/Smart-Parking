import React from "react";
import { Filter, Calendar, X } from "lucide-react";

const TransactionFilters = ({ filters, onFilterChange, onClear }) => {
  const hasFilters =
    filters.type || filters.status || filters.startDate || filters.endDate;

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const selectStyle =
    "w-full p-3.5 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-xl text-[11px] font-black uppercase tracking-widest text-[#FAF3E1] outline-none focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 transition-all appearance-none cursor-pointer";
  const inputStyle =
    "w-full p-3.5 pl-10 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-xl text-[11px] font-black uppercase tracking-widest text-[#FAF3E1] outline-none focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 transition-all [color-scheme:dark]";

  return (
    <div className="bg-[#FAF3E1]/[0.02] p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Filter size={14} className="text-[#FA8112]" />
        <h4 className="text-[10px] font-black text-[#FAF3E1] uppercase tracking-[0.2em]">
          Advanced Intelligence Search
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Transaction Type */}
        <div className="relative">
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
            className={selectStyle}
          >
            <option value="" className="bg-[#222222]">
              All Flow Types
            </option>
            <option value="credit" className="bg-[#222222]">
              Credits (Top-ups)
            </option>
            <option value="debit" className="bg-[#222222]">
              Debits (Payments)
            </option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FAF3E1]/20">
            <div className="w-1 h-1 bg-[#FA8112] rounded-full" />
          </div>
        </div>

        {/* Transaction Status */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className={selectStyle}
          >
            <option value="" className="bg-[#222222]">
              All Statuses
            </option>
            <option value="success" className="bg-[#222222]">
              Success
            </option>
            <option value="pending" className="bg-[#222222]">
              Pending
            </option>
            <option value="failed" className="bg-[#222222]">
              Failed
            </option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FAF3E1]/20">
            <div className="w-1 h-1 bg-[#FA8112] rounded-full" />
          </div>
        </div>

        {/* Start Date */}
        <div className="relative group">
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
            size={16}
          />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange({ startDate: e.target.value })}
            className={inputStyle}
          />
        </div>

        {/* End Date */}
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={16}
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange({ endDate: e.target.value })}
              className={inputStyle}
            />
          </div>

          {hasFilters && (
            <button
              onClick={onClear}
              className="px-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-[#222222] transition-all"
              title="Clear Filters"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;

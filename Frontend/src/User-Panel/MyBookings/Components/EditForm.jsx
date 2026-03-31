import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  X,
  Save,
  AlertTriangle,
  ChevronRight,
  Timer,
} from "lucide-react";
import { format, differenceInHours } from "date-fns";

const EditForm = ({ booking, onEdit, onCancel, onClose, disabled }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      setStartTime(new Date(booking.startTime));
      setEndTime(new Date(booking.endTime));
    }
  }, [booking]);

  const duration =
    startTime && endTime
      ? Math.max(0, differenceInHours(endTime, startTime))
      : 0;

  const handleSubmit = async () => {
    if (!startTime || !endTime || !booking) return;
    setLoading(true);
    try {
      await onEdit(booking._id, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
      onClose();
    } catch (err) {
      console.error("Edit failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (
      window.confirm(
        "Are you sure? This will release your parking spot immediately.",
      )
    ) {
      onCancel(booking._id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-[#222222]/80 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#1a1a1a] shadow-2xl">
        {/* Top Branding Strip */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FA8112] to-[#ff9d42]" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#FAF3E1] italic uppercase tracking-tighter flex items-center gap-3">
                <Calendar className="text-[#FA8112]" size={24} />
                Modify Pass
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20">
                Reschedule your reservation
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Time Inputs */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                Arrival Time
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20"
                  size={18}
                />
                <input
                  type="datetime-local"
                  value={
                    startTime ? format(startTime, "yyyy-MM-dd'T'HH:mm") : ""
                  }
                  onChange={(e) => setStartTime(new Date(e.target.value))}
                  className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 pl-12 pr-4 text-[#FAF3E1] font-bold text-sm focus:outline-none focus:border-[#FA8112] transition-all"
                  disabled={loading || disabled}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                Departure Time
              </label>
              <div className="relative">
                <Timer
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20"
                  size={18}
                />
                <input
                  type="datetime-local"
                  value={endTime ? format(endTime, "yyyy-MM-dd'T'HH:mm") : ""}
                  onChange={(e) => setEndTime(new Date(e.target.value))}
                  className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 pl-12 pr-4 text-[#FAF3E1] font-bold text-sm focus:outline-none focus:border-[#FA8112] transition-all"
                  disabled={loading || disabled}
                />
              </div>
            </div>

            {/* Duration Preview Box */}
            <div className="bg-[#FA8112]/5 border border-[#FA8112]/10 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-xs font-black text-[#FA8112] uppercase tracking-tighter">
                New Total Duration
              </span>
              <span className="text-xl font-black text-[#FAF3E1] italic">
                {duration}{" "}
                <small className="text-[10px] uppercase not-italic opacity-40">
                  Hours
                </small>
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading || disabled || !startTime || !endTime}
                className="w-full flex items-center justify-center gap-3 bg-[#FA8112] py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-[#222222] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#FA8112]/20 disabled:opacity-30"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    Apply Changes <ChevronRight size={16} />
                  </>
                )}
              </button>

              <div className="h-px w-full bg-[#F5E7C6]/5 my-2" />

              <button
                onClick={handleCancelClick}
                disabled={loading || disabled}
                className="group w-full flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-all"
              >
                <AlertTriangle
                  size={14}
                  className="group-hover:animate-pulse"
                />
                Terminate Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;

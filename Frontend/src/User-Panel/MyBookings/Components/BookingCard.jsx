import React, { useState } from "react";
import {
  MapPin,
  Hash,
  DollarSign,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import ExtendForm from "./ExtendForm";
import EditForm from "./EditForm";

const BookingCard = ({
  booking,
  onExtend,
  onEdit,
  onCancel,
  isCurrent = false,
  isUpcoming = false,
  extendingId = null,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  const remaining = formatDistanceToNow(new Date(booking.endTime), {
    addSuffix: true,
  });

  return (
    <div className="group relative overflow-hidden bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-[2rem] p-6 transition-all hover:bg-[#FAF3E1]/[0.06] hover:border-[#FA8112]/30">
      {/* 1. Ticket Header: Status & Price */}
      <div className="flex justify-between items-start mb-6">
        <div
          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
            isCurrent
              ? "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20 animate-pulse"
              : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#FAF3E1]/10"
          }`}
        >
          {isCurrent ? "● Active Session" : "● Scheduled"}
        </div>
        <div className="flex items-center gap-1 bg-[#FAF3E1]/5 px-3 py-1 rounded-lg">
          <DollarSign size={12} className="text-[#FA8112]" />
          <span className="text-sm font-black text-[#FAF3E1] italic">
            ₹{Number(booking.totalAmount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* 2. Main Body: Location & Slot */}
      <div className="flex gap-4 items-start mb-8">
        <div className="h-12 w-12 bg-[#FA8112]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#FA8112]/20">
          <MapPin className="h-6 w-6 text-[#FA8112]" />
        </div>
        <div className="space-y-1 overflow-hidden">
          <h3 className="font-black text-[#FAF3E1] text-xl italic uppercase tracking-tighter truncate leading-none">
            {booking.parking?.name || "Smart Parking"}
          </h3>
          <p className="text-[#FAF3E1]/30 text-[10px] font-bold uppercase truncate tracking-wide">
            {booking.parking?.location || "General Zone"}
          </p>
        </div>
      </div>

      {/* 3. Divider with Ticket Notches */}
      <div className="relative h-px w-full border-t border-dashed border-[#F5E7C6]/20 my-6">
        <div className="absolute -left-10 -top-2.5 h-5 w-5 rounded-full bg-[#222222]" />
        <div className="absolute -right-10 -top-2.5 h-5 w-5 rounded-full bg-[#222222]" />
      </div>

      {/* 4. Footer: Timing & Actions */}
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="space-y-1">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20">
            {isCurrent ? "Expires In" : "Entry Time"}
          </p>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#FA8112]" />
            <span className="text-sm font-black text-[#FAF3E1] italic">
              {isCurrent
                ? remaining
                : format(new Date(booking.startTime), "HH:mm | MMM dd")}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-1">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20">
            Designated Spot
          </p>
          <div className="flex items-center gap-2 bg-[#FA8112] text-[#222222] px-3 py-1 rounded-lg">
            <Hash size={12} className="font-black" />
            <span className="text-xs font-black uppercase italic">
              {booking.slot?.label || "TBD"}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Conditional Actions */}
      <div className="mt-8 pt-6 border-t border-[#F5E7C6]/5 flex flex-col gap-3">
        {isCurrent && (
          <>
            <ExtendForm
              bookingId={booking._id}
              onExtend={onExtend}
              disabled={extendingId === booking._id}
            />
            <button
              onClick={() => onCancel(booking._id)}
              className="w-full text-xs font-black uppercase tracking-widest text-red-400 border border-red-400/30 py-3 rounded-xl hover:bg-red-500/10 transition-all"
            >
              Cancel Booking
            </button>
          </>
        )}

        {isUpcoming && (
          <>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowEdit(true)}
                className="flex-1 text-xs font-black uppercase tracking-widest text-[#FA8112] border border-[#FA8112]/30 py-3 rounded-xl hover:bg-[#FA8112]/10 transition-all"
              >
                Edit Booking
              </button>
              <button
                onClick={() => onCancel(booking._id)}
                className="flex-1 text-xs font-black uppercase tracking-widest text-red-400 border border-red-400/30 py-3 rounded-xl hover:bg-red-500/10 transition-all"
              >
                Cancel Upcoming
              </button>
            </div>
            {showEdit && (
              <EditForm
                booking={booking}
                onEdit={onEdit}
                onCancel={onCancel}
                onClose={() => setShowEdit(false)}
                disabled={extendingId === booking._id}
              />
            )}
          </>
        )}
      </div>

      {/* Background Decorative Element */}
      <ShieldCheck className="absolute -right-4 -top-4 w-24 h-24 text-[#FAF3E1]/[0.02] -rotate-12 pointer-events-none" />
    </div>
  );
};

export default BookingCard;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  ShieldCheck,
} from "lucide-react";
import { bookingService } from "../Services/bookingService";
import BookingStatusBadge from "../Components/BookingStatusBadge";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  useEffect(() => {
    bookingService.getById(id).then((res) => {
      setBooking(res.data.data);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setPendingStatus(newStatus);
    setShowConfirm(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus) return;
    const newStatus = pendingStatus;
    setShowConfirm(false);
    setPendingStatus(null);

    try {
      await bookingService.updateStatus(id, newStatus);
      const updated = await bookingService.getById(id);
      setBooking(updated.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Terminal update failed");
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em] text-xs animate-pulse">
        Fetching Encrypted Ticket Data...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] font-black uppercase tracking-widest text-[10px] transition-all group"
      >
        <ChevronLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Terminal
      </button>

      <div className="bg-[#FAF3E1]/[0.02] rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-2xl overflow-hidden relative">
        {/* Header Section */}
        <div className="p-10 border-b border-[#F5E7C6]/5 flex justify-between items-center bg-[#FAF3E1]/[0.02]">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-[#FA8112] rounded-full" />
              <h2 className="text-2xl font-black text-[#FAF3E1] uppercase tracking-tighter">
                Booking <span className="text-[#FA8112]">Ticket</span>
              </h2>
            </div>
            <p className="text-[10px] text-[#FAF3E1]/20 mt-3 font-mono uppercase tracking-[0.2em]">
              Transaction ID: {booking._id}
            </p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-12">
          {/* Left Column: User & Vehicle */}
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] flex items-center gap-2">
                <User size={12} className="text-[#FA8112]" /> Customer
                Information
              </label>
              <div className="p-6 bg-[#FAF3E1]/[0.03] rounded-[2rem] border border-[#F5E7C6]/5 shadow-inner">
                <p className="font-black text-[#FAF3E1] text-lg tracking-tight">
                  {booking.user?.name}
                </p>
                <p className="text-xs text-[#FAF3E1]/40 font-medium mt-1">
                  {booking.user?.email}
                </p>
                <p className="text-xs text-[#FAF3E1]/40 font-medium">
                  {booking.user?.phone}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck size={12} className="text-[#FA8112]" /> Verified
                Vehicle
              </label>
              <p className="text-4xl font-black text-[#FA8112] tracking-tighter font-mono uppercase">
                {booking.vehicleNumber}
              </p>
            </div>
          </div>

          {/* Right Column: Reservation details */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-[#FAF3E1]/[0.03] rounded-2xl border border-[#F5E7C6]/5">
                <label className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest block mb-2">
                  Entry Log
                </label>
                <p className="font-black text-[#FAF3E1] text-xs">
                  {new Date(booking.startTime).toLocaleString()}
                </p>
              </div>
              <div className="p-5 bg-[#FAF3E1]/[0.03] rounded-2xl border border-[#F5E7C6]/5">
                <label className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest block mb-2">
                  Exit Log
                </label>
                <p className="font-black text-[#FAF3E1] text-xs">
                  {new Date(booking.endTime).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Total Card: Using Accent Color */}
            <div className="p-8 bg-[#FA8112] rounded-[2rem] text-[#222222] flex justify-between items-center shadow-xl shadow-[#FA8112]/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 opacity-10">
                <Clock size={120} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                  Settlement Amount
                </p>
                <h3 className="text-4xl font-black tracking-tighter">
                  ${booking.totalAmount}
                </h3>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  Status
                </p>
                <p className="font-black text-lg italic uppercase tracking-tighter">
                  {booking.paymentStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-10 bg-[#FAF3E1]/[0.02] border-t border-[#F5E7C6]/5 flex flex-wrap gap-4">
          {booking.status === "pending" && (
            <button
              onClick={() => handleStatusChange("confirmed")}
              className="flex items-center gap-3 px-8 py-4 bg-[#FA8112] text-[#222222] rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#FA8112]/10 hover:bg-[#FAF3E1] transition-all active:scale-95"
            >
              <CheckCircle size={18} /> Confirm Unit
            </button>
          )}
          {booking.status === "confirmed" && (
            <button
              onClick={() => handleStatusChange("active")}
              className="flex items-center gap-3 px-8 py-4 bg-cyan-500 text-[#222222] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#FAF3E1] transition-all active:scale-95"
            >
              Initialize Check-in
            </button>
          )}
          {booking.status === "active" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="flex items-center gap-3 px-8 py-4 bg-[#FAF3E1]/[0.1] text-[#FAF3E1] border border-[#F5E7C6]/10 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#FA8112] hover:text-[#222222] transition-all active:scale-95"
            >
              Complete Check-out
            </button>
          )}
          {["pending", "confirmed"].includes(booking.status) && (
            <button
              onClick={() => handleStatusChange("cancelled")}
              className="flex items-center gap-3 px-8 py-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-rose-500 hover:text-[#222222] transition-all"
            >
              <XCircle size={18} /> Void Ticket
            </button>
          )}
        </div>
      </div>

      {/* System Note */}
      <div className="text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
          Automated Billing & Reservation Node • v1.0.8
        </p>
      </div>
      <ConfirmDialog
        open={showConfirm}
        title="Update Booking Status"
        message={`Update terminal status to ${pendingStatus?.toUpperCase() || ""}?`}
        confirmLabel="Update"
        intent="default"
        onConfirm={confirmStatusChange}
        onCancel={() => {
          setShowConfirm(false);
          setPendingStatus(null);
        }}
      />
    </div>
  );
};

export default BookingDetails;

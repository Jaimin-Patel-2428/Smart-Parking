import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Clock,
  Car,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  Smartphone,
  Banknote,
  Wallet,
} from "lucide-react";
import VehicleSelector from "../Components/VehicleSelector";
import parkingService from "../Services/parkingService";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";

const BookingPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { parking, slot, startTime, endTime } = location.state || {};
  const [selectedVehicle, setSelectedVehicle] = useState(
    user?.vehicleNumber || "",
  );
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationHours = Math.max(
    1,
    Math.ceil((end - start) / (1000 * 60 * 60)),
  );
  const totalAmount = durationHours * parking?.basePrice;

  const handleConfirm = async () => {
    if (!user?.vehicleNumber)
      return toast.error("Update vehicle in profile first");
    if (!selectedVehicle || selectedVehicle === "Add New")
      return toast.error("Select a vehicle");

    setIsSubmitting(true);
    try {
      const bookingData = {
        userId: user._id || user.id,
        parkingId: parking._id,
        slotId: slot._id,
        vehicleNumber: selectedVehicle,
        startTime,
        endTime,
        duration: durationHours,
        hourlyRate: parking?.basePrice,
        totalAmount,
        paymentMethod: paymentMethod === "cash" ? "cash_on_counter" : paymentMethod,
      };

      const { data } = await parkingService.confirmBooking(bookingData);
      toast.success("Spot Secured!");
      navigate("/user/parking/success", { state: { booking: data.booking } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!parking)
    return (
      <div className="text-[#FAF3E1] p-10 text-center italic opacity-40">
        No session data found.
      </div>
    );

  const paymentOptions = [
    { key: "upi", label: "UPI", icon: <Smartphone size={18} /> },
    { key: "credit_debit_card", label: "Card", icon: <CreditCard size={18} /> },
    { key: "net_banking", label: "Net Bank", icon: <Wallet size={18} /> },
    { key: "cash_on_counter", label: "Counter", icon: <Banknote size={18} /> },
  ];

  return (
    <div className="max-w-2xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-[#FAF3E1]/5 rounded-2xl text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] italic uppercase tracking-tighter leading-none">
            Checkout
          </h1>
          <p className="text-[10px] font-bold text-[#FA8112] uppercase tracking-[0.3em] mt-1">
            Finalize your reservation
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] shadow-2xl">
        {/* Pass Branding */}
        <div className="bg-gradient-to-r from-[#FA8112] to-[#ff9d42] p-8 text-[#222222] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              Secure Entry Pass
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
              System ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
          <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 -rotate-12" />
        </div>

        <div className="p-8 space-y-10">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20">
                Location
              </p>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FA8112]/10 rounded-xl text-[#FA8112]">
                  <MapPin size={18} />
                </div>
                <p className="font-black text-[#FAF3E1] italic uppercase text-sm tracking-tight">
                  {parking.name}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20">
                Assigned Spot
              </p>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FA8112]/10 rounded-xl text-[#FA8112]">
                  <ShieldCheck size={18} />
                </div>
                <p className="font-black text-[#FAF3E1] italic uppercase text-sm tracking-tight">
                  Slot {slot.label}
                </p>
              </div>
            </div>
          </div>

          {/* Time & Duration Pass */}
          <div className="relative bg-[#222222] border border-[#F5E7C6]/5 rounded-3xl p-6 overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-[#FA8112] uppercase tracking-widest">
                  Arrival
                </p>
                <p className="text-sm font-black text-[#FAF3E1] italic">
                  {start.toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="h-10 w-px bg-[#F5E7C6]/10" />
              <div className="space-y-1 text-right">
                <p className="text-[9px] font-black text-[#FA8112] uppercase tracking-widest">
                  Duration
                </p>
                <p className="text-sm font-black text-[#FAF3E1] italic">
                  {durationHours} Hours
                </p>
              </div>
            </div>
            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 h-5 w-5 bg-[#1a1a1a] rounded-full border border-[#F5E7C6]/10" />
            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 h-5 w-5 bg-[#1a1a1a] rounded-full border border-[#F5E7C6]/10" />
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20 ml-1">
              Confirm Vehicle
            </p>
            <VehicleSelector
              selectedVehicle={selectedVehicle}
              onSelect={setSelectedVehicle}
              vehicles={user?.vehicleNumber ? [user.vehicleNumber] : []}
            />
          </div>

          {/* Payment Method Chips */}
          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20 ml-1">
              Payment Method
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {paymentOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setPaymentMethod(option.key)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    paymentMethod === option.key
                      ? "border-[#FA8112] bg-[#FA8112]/10 text-[#FA8112]"
                      : "border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.02] text-[#FAF3E1]/30 hover:bg-[#FAF3E1]/[0.05]"
                  }`}
                >
                  {option.icon}
                  <span className="text-[10px] font-black uppercase tracking-tighter italic">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Total & Action */}
          <div className="pt-10 border-t border-[#F5E7C6]/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20">
                Grand Total
              </p>
              <h2 className="text-4xl font-black text-[#FAF3E1] italic leading-none mt-1">
                ₹{totalAmount.toFixed(2)}
              </h2>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isSubmitting || !user?.vehicleNumber}
              className="w-full md:w-auto bg-[#FA8112] text-[#222222] px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#FA8112]/20 disabled:opacity-20"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPreview;

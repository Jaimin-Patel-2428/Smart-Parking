import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  ShieldCheck,
  Loader2,
  Info,
  ArrowLeft,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import parkingService from "../Services/parkingService";
import SlotGrid from "../Components/SlotGrid";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";

const ParkingDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingTime, setBookingTime] = useState({ start: "", end: "" });
  const [isLocking, setIsLocking] = useState(false);
  const [isTimeFiltered, setIsTimeFiltered] = useState(false);
  const [timeError, setTimeError] = useState("");

  const fetchDetails = async (start, end) => {
    try {
      const res = await parkingService.getParkingDetails(id, start, end);
      setData(res.data);
      setIsTimeFiltered(!!(start && end));
    } catch (err) {
      toast.error("Could not load parking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDetails();
  }, [id]);

  const validateTimes = () => {
    setTimeError("");
    const s = new Date(bookingTime.start);
    const e = new Date(bookingTime.end);

    if (!bookingTime.start || !bookingTime.end) {
      setTimeError("Select both arrival and departure time");
      return false;
    }
    if (s >= e) {
      setTimeError("Departure must be after arrival");
      return false;
    }
    if (s <= new Date()) {
      setTimeError("Booking must be for a future time");
      return false;
    }
    return true;
  };

  const handleSearchAvailability = async () => {
    if (!validateTimes()) return;
    setLoading(true);
    await fetchDetails(bookingTime.start, bookingTime.end);
    setSelectedSlot(null);
  };

  const handleProceed = async () => {
    if (!selectedSlot || !bookingTime.start || !bookingTime.end) {
      return toast.error("Select a slot and verify times");
    }
    setIsLocking(true);
    try {
      await parkingService.lockSlot(selectedSlot._id);
      navigate("/user/parking/preview", {
        state: {
          parking: data.parking,
          slot: selectedSlot,
          startTime: bookingTime.start,
          endTime: bookingTime.end,
          hourlyRate: data.parking.basePrice,
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Slot already taken");
    } finally {
      setIsLocking(false);
    }
  };

  if (loading && !data)
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-[#FA8112]" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20 italic">
          Loading Grid...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto pb-24">
      {/* 1. Header Navigation */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-[#FAF3E1]/5 rounded-2xl text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
              {data.parking.name}
            </h1>
            <p className="flex items-center gap-2 text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest mt-1">
              <MapPin size={12} className="text-[#FA8112]" />{" "}
              {data.parking.location}
            </p>
          </div>
        </div>

        {/* Availability Summary Chips */}
        {data.availabilitySummary && isTimeFiltered && (
          <div className="flex gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-center">
              <p className="text-[8px] font-black uppercase text-emerald-500/50 leading-none mb-1">
                Available
              </p>
              <p className="text-sm font-black text-emerald-500 italic leading-none">
                {data.availabilitySummary.available}
              </p>
            </div>
            <div className="bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 px-4 py-2 rounded-xl text-center">
              <p className="text-[8px] font-black uppercase text-[#FAF3E1]/20 leading-none mb-1">
                Total
              </p>
              <p className="text-sm font-black text-[#FAF3E1] italic leading-none">
                {data.availabilitySummary.total}
              </p>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* 2. Slot Selection (Left - 8 Cols) */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-[#FAF3E1] italic uppercase tracking-tight">
                Select <span className="text-[#FA8112]">Your Space</span>
              </h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
                  <div className="w-2 h-2 bg-[#FAF3E1]/10 rounded-full" />{" "}
                  Vacant
                </div>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#FA8112]">
                  <div className="w-2 h-2 bg-[#FA8112] rounded-full animate-pulse" />{" "}
                  Selected
                </div>
              </div>
            </div>

            <div className="relative">
              {!isTimeFiltered && (
                <div className="absolute inset-0 z-10 backdrop-blur-[2px] bg-[#222222]/40 rounded-3xl flex items-center justify-center text-center p-10">
                  <div className="max-w-xs space-y-4">
                    <div className="bg-[#FA8112]/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border border-[#FA8112]/20">
                      <Clock size={24} className="text-[#FA8112]" />
                    </div>
                    <p className="text-sm font-bold text-[#FAF3E1]/60 leading-relaxed italic">
                      Set your arrival and departure times in the sidebar to
                      view available slots.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-4 bg-[#2a2a2a]/30 rounded-3xl border border-[#F5E7C6]/5">
                <SlotGrid
                  slots={data.slots}
                  selectedSlot={selectedSlot}
                  onSelect={setSelectedSlot}
                  isTimeSelected={isTimeFiltered}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Booking Console (Right - 4 Cols) */}
        <aside className="xl:col-span-4 space-y-6">
          <div className="bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-[2.5rem] p-8 sticky top-24 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#FA8112] opacity-10 blur-3xl rounded-full" />

            <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter mb-8 flex items-center gap-2">
              <CheckCircle2 className="text-[#FA8112]" size={20} />
              Booking Console
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
                  Arrival
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl p-4 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
                  value={bookingTime.start}
                  onChange={(e) =>
                    setBookingTime({ ...bookingTime, start: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
                  Departure
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl p-4 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
                  value={bookingTime.end}
                  onChange={(e) =>
                    setBookingTime({ ...bookingTime, end: e.target.value })
                  }
                />
              </div>

              {timeError && (
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase italic px-1">
                  <Info size={12} /> {timeError}
                </div>
              )}

              <button
                onClick={handleSearchAvailability}
                className="w-full py-4 rounded-2xl bg-emerald-500 text-[#222222] font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/10 mt-2"
              >
                Scan Availability
              </button>
            </div>

            {/* Pricing Section */}
            <div className="mt-10 pt-8 border-t border-[#F5E7C6]/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/20 italic">
                  Hourly Rate
                </span>
                <span className="text-2xl font-black text-[#FAF3E1] italic">
                  ₹{data.parking.basePrice}
                  <span className="text-[10px] not-italic opacity-40 ml-1">
                    /hr
                  </span>
                </span>
              </div>

              <div className="bg-[#FA8112]/5 p-4 rounded-2xl flex gap-3 text-[10px] text-[#FA8112] font-bold leading-relaxed border border-[#FA8112]/10">
                <Info size={16} className="shrink-0" />
                <p>
                  10-minute automated buffer included in all reservations for
                  driver safety.
                </p>
              </div>
            </div>

            {/* Primary CTA */}
            <button
              onClick={handleProceed}
              disabled={isLocking || !selectedSlot || !isTimeFiltered}
              className="w-full mt-8 bg-[#FA8112] text-[#222222] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 disabled:opacity-20 transition-all shadow-2xl shadow-[#FA8112]/20 uppercase text-xs tracking-widest"
            >
              {isLocking ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <ShieldCheck size={18} /> Confirm Selection
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ParkingDetails;

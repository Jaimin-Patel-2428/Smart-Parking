import React from "react";
import { MapPin, ArrowRight, Hash, Zap, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParkingCard = ({ parking }) => {
  const navigate = useNavigate();
  const available = parking.totalSlots - parking.occupiedSlots;
  const occupancyPercentage =
    (parking.occupiedSlots / parking.totalSlots) * 100;

  return (
    <div className="group relative overflow-hidden bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/5 rounded-[2.5rem] p-6 transition-all hover:bg-[#FAF3E1]/[0.06] hover:border-[#FA8112]/30 flex flex-col justify-between h-full">
      {/* 1. Header: Name & Premium Price Tag */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1 max-w-[70%]">
          <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter leading-none truncate group-hover:text-[#FA8112] transition-colors">
            {parking.name}
          </h3>
          <p className="flex items-center gap-1.5 text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest truncate">
            <MapPin size={12} className="text-[#FA8112]" /> {parking.location}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-lg font-black text-[#FAF3E1] italic leading-none">
            ₹{parking.basePrice}
          </span>
          <span className="text-[8px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
            Per Hour
          </span>
        </div>
      </div>

      {/* 2. Capacity Metrics with Visual Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-0.5">
              Availability
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#FAF3E1] italic tracking-tighter leading-none">
                {available}
              </span>
              <span className="text-[10px] font-black uppercase text-[#FAF3E1]/20 tracking-widest">
                / {parking.totalSlots} SPACES
              </span>
            </div>
          </div>

          <div className="bg-[#FAF3E1]/5 p-2 rounded-xl text-[#FAF3E1]/40 group-hover:text-[#FA8112] transition-all">
            <Navigation size={18} />
          </div>
        </div>

        {/* Dynamic Capacity Bar */}
        <div className="h-[3px] w-full bg-[#FAF3E1]/5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out rounded-full ${
              occupancyPercentage > 90 ? "bg-red-500" : "bg-[#FA8112]"
            }`}
            style={{ width: `${100 - occupancyPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. Action CTA */}
      <button
        onClick={() => navigate(`/user/parking/${parking._id}`)}
        className="relative overflow-hidden w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-xs font-black uppercase tracking-widest text-[#FAF3E1]/60 group-hover:bg-[#FA8112] group-hover:text-[#222222] group-hover:border-[#FA8112] transition-all shadow-xl group-hover:shadow-[#FA8112]/20"
      >
        <Zap
          size={14}
          className={
            available > 0
              ? "text-[#FA8112] group-hover:text-[#222222]"
              : "hidden"
          }
        />
        {available > 0 ? "Book This Space" : "Full Capacity"}
        <ArrowRight
          size={16}
          className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform"
        />
      </button>

      {/* Decorative Background Element */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#FA8112] opacity-0 blur-[60px] group-hover:opacity-10 transition-opacity pointer-events-none" />
    </div>
  );
};

export default ParkingCard;

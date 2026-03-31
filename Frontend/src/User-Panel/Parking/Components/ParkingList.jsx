import React from "react";
import ParkingCard from "./ParkingCard";
import { Radar, SearchX, Loader2 } from "lucide-react";

const ParkingList = ({ parkings, loading }) => {
  // 1. Premium Skeleton Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-72 rounded-[2.5rem] bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 relative overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF3E1]/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-1/2">
                  <div className="h-4 bg-[#FAF3E1]/5 rounded-full w-full" />
                  <div className="h-2 bg-[#FAF3E1]/5 rounded-full w-2/3" />
                </div>
                <div className="h-8 w-16 bg-[#FAF3E1]/5 rounded-xl" />
              </div>
              <div className="space-y-3 pt-4">
                <div className="h-10 bg-[#FAF3E1]/5 rounded-2xl w-full" />
                <div className="h-12 bg-[#FA8112]/5 rounded-2xl w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. High-Fidelity Empty State
  if (parkings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/10 rounded-[3rem] text-center relative overflow-hidden group">
        {/* Background Decorative Radar Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-64 h-64 border border-[#FA8112]/10 rounded-full animate-ping" />
        </div>

        <div className="relative z-10">
          <div className="bg-[#FAF3E1]/5 p-6 rounded-full mb-6 inline-flex border border-[#F5E7C6]/5 group-hover:border-[#FA8112]/20 transition-colors">
            <SearchX
              size={40}
              className="text-[#FAF3E1]/10 group-hover:text-[#FA8112]/40 transition-colors"
            />
          </div>
          <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
            Zero <span className="text-[#FA8112]">Zones</span> Detected
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20 mt-3 max-w-xs mx-auto">
            Try adjusting your search radius or checking a different landmark.
          </p>
        </div>
      </div>
    );
  }

  // 3. Optimized Grid View
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {parkings.map((parking) => (
        <ParkingCard key={parking._id} parking={parking} />
      ))}
    </div>
  );
};

export default ParkingList;

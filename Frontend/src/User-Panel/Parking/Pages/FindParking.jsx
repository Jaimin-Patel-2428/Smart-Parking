import React, { useState } from "react";
import {
  Search,
  Filter,
  Loader2,
  MapPin,
  Compass,
  SlidersHorizontal,
} from "lucide-react";
import { useParkings } from "../Hooks/useParkings";
import ParkingCard from "../Components/ParkingCard";

const FindParking = () => {
  const { parkings, loading } = useParkings();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParkings = parkings.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen pb-24">
      {/* 1. Dynamic Header Section */}
      <header className="mb-12 px-2">
        <div className="flex flex-col lg:flex-row lg:items-end px-12 justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#FA8112]/10 p-2 rounded-xl">
                <Compass className="text-[#FA8112]" size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tight">
                Nearby <span className="text-[#FA8112]">Zones</span>
              </h1>
            </div>
            <p className="text-[#FAF3E1]/40 font-bold flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] ml-12">
              Discover verified parking spaces in your area
            </p>
          </div>

          {/* Premium Search Bar */}
          <div className="relative w-full lg:w-[450px] group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search
                className="text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                size={18}
              />
            </div>
            <input
              type="text"
              placeholder="Search by location, mall, or station..."
              className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-[2rem] py-5 pl-14 pr-6 text-sm font-bold text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/50 focus:bg-[#FAF3E1]/[0.05] transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-[#FA8112]/10 rounded-2xl text-[#FA8112] hover:bg-[#FA8112] hover:text-[#222222] transition-all">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Results Section */}
      <div className="relative min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <div className="relative">
              <Loader2 className="animate-spin text-[#FA8112]" size={48} />
              <div className="absolute inset-0 blur-xl bg-[#FA8112]/20 animate-pulse" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20">
              Scanning Grid...
            </p>
          </div>
        ) : filteredParkings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-6 bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/10 rounded-[3rem] text-center">
            <div className="bg-[#FAF3E1]/5 p-6 rounded-full mb-6">
              <MapPin className="h-12 w-12 text-[#FAF3E1]/10" />
            </div>
            <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
              No Zones Detected
            </h3>
            <p className="text-[#FAF3E1]/20 text-xs mt-2">
              Try searching for a different landmark or area.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-12  animate-in fade-in slide-in-from-bottom-6 duration-700">
            {filteredParkings.map((parking) => (
              <ParkingCard key={parking._id} parking={parking} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Map Toggle (Visual Polish) */}
      <div className="fixed bottom-28 right-8 z-40 hidden lg:block">
        <button className="bg-[#222222] border border-[#FA8112]/30 text-[#FA8112] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#FA8112] hover:text-[#222222] transition-all shadow-2xl shadow-[#FA8112]/20">
          <MapPin size={16} /> View On Map
        </button>
      </div>
    </div>
  );
};

export default FindParking;

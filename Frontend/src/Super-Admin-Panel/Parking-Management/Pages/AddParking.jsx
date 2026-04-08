import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parkingService } from "../Services/parkingService";
import ParkingForm from "../Components/ParkingForm";
import { ChevronLeft, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

const AddParking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const handleAdd = async (formData) => {
    try {
      setLoading(true);

      const cleanData = {
        ...formData,
        totalSlots: Number(formData.totalSlots),
        basePrice: Number(formData.basePrice),
      };

      await parkingService.create(cleanData);
      toast.success("Parking location created successfully");
      navigate("/super-admin/parking");
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || "Check your backend connection";
      console.error("Backend said:", serverMessage);
      toast.error("Error: " + serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Back Button - Styled with Cream #FAF3E1 at 40% opacity */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] font-black uppercase tracking-widest text-[10px] transition-all group"
      >
        <ChevronLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Directory
      </button>

      {/* Main Container - Card Style: #FAF3E1 at 2% opacity */}
      <div className="bg-[#FAF3E1]/[0.02] p-10 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Icon */}
        <PlusCircle
          size={120}
          className="absolute -right-4 -top-4 text-[#FAF3E1]/[0.02] pointer-events-none"
        />

        <div className="mb-10 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-[#FA8112] rounded-full" />
            <h1 className="text-3xl font-black text-[#FAF3E1] tracking-tighter uppercase">
              Register <span className="text-[#FA8112]">New Zone</span>
            </h1>
          </div>
          <p className="text-[#FAF3E1]/40 text-sm font-medium italic">
            Initialize a new parking asset with capacity and pricing logic.
          </p>
        </div>

        {/* The Form - Inherits the dark theme styles we applied earlier */}
        <div className="relative z-10">
          <ParkingForm
            onSubmit={handleAdd}
            onCancel={() => navigate("/super-admin/parking")}
            isLoading={loading}
          />
        </div>
      </div>

      {/* System Note */}
      <div className="text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
          Secure Asset Registration Module • v1.0.2
        </p>
      </div>
    </div>
  );
};

export default AddParking;

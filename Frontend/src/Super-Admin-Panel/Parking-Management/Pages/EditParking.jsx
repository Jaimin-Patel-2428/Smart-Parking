import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { parkingService } from "../Services/parkingService";
import ParkingForm from "../Components/ParkingForm";
import { ChevronLeft, Loader2, Edit3 } from "lucide-react";
import toast from "react-hot-toast";

const EditParking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  useEffect(() => {
    const fetchParkingDetails = async () => {
      try {
        const response = await parkingService.getById(id);
        setInitialData(response.data);
      } catch (err) {
        console.error("Failed to load parking details", err);
        toast.error("Could not find this parking location.");
        navigate("/super-admin/parking");
      } finally {
        setLoading(false);
      }
    };
    fetchParkingDetails();
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      setIsUpdating(true);
      await parkingService.update(id, updatedData);
      toast.success("Parking location updated successfully");
      navigate("/super-admin/parking");
    } catch (err) {
      toast.error("Failed to update parking location.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Back Button */}
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

      {/* Main Container - Card Style */}
      <div className="bg-[#FAF3E1]/[0.02] p-10 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Icon */}
        <Edit3
          size={120}
          className="absolute -right-4 -top-4 text-[#FAF3E1]/[0.02] pointer-events-none"
        />

        <div className="mb-10 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-[#FA8112] rounded-full" />
            <h1 className="text-3xl font-black text-[#FAF3E1] tracking-tighter uppercase">
              Modify <span className="text-[#FA8112]">Parking Zone</span>
            </h1>
          </div>
          <p className="text-[#FAF3E1]/40 text-sm font-medium italic">
            Updating:{" "}
            <span className="text-[#FA8112] font-mono not-italic font-black">
              ID-{id.slice(-6).toUpperCase()}
            </span>
          </p>
        </div>

        {loading ? (
          <div className="h-80 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#FA8112]" />
            <p className="text-[#FAF3E1]/30 font-black uppercase tracking-[0.2em] text-[10px]">
              Retrieving asset details...
            </p>
          </div>
        ) : (
          <div className="relative z-10">
            <ParkingForm
              initialData={initialData}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/super-admin/parking")}
              isLoading={isUpdating}
            />
          </div>
        )}
      </div>

      {/* System Note */}
      <div className="text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
          Internal Asset Modification Module • v1.0.4
        </p>
      </div>
    </div>
  );
};

export default EditParking;

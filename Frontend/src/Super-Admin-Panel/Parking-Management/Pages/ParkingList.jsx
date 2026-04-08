import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, MapPin, Loader2 } from "lucide-react";
import { useParking } from "../Hooks/useParking";
import ParkingTable from "../Components/ParkingTable";
import { parkingService } from "../Services/parkingService";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";

const ParkingList = () => {
  const navigate = useNavigate();
  const { parkings, loading, refresh } = useParking();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [parkingToDelete, setParkingToDelete] = useState(null);

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const filteredParkings = parkings.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    setParkingToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!parkingToDelete) return;
    const id = parkingToDelete;
    setShowDeleteConfirm(false);
    setParkingToDelete(null);

    try {
      await parkingService.delete(id);
      toast.success("Parking deleted successfully", {
        style: {
          background: "#222222",
          color: "#FAF3E1",
          border: "1px solid rgba(245, 231, 198, 0.1)",
        },
      });
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-[#222222]">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] tracking-tighter uppercase">
            Parking <span className="text-[#FA8112]">Management</span>
          </h1>
          <p className="text-xs text-[#FAF3E1]/40 font-black uppercase tracking-[0.2em] mt-1">
            Live Directory: {parkings.length} Active Assets
          </p>
        </div>
        <button
          onClick={() => navigate("/super-admin/parking/add")}
          className="flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#FAF3E1] transition-all shadow-lg shadow-[#FA8112]/10 active:scale-95"
        >
          <Plus size={18} />
          Add Location
        </button>
      </div>

      {/* --- Search & Filters Bar --- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-[#FAF3E1]/[0.02] p-2 rounded-[2rem] border border-[#F5E7C6]/10 shadow-sm">
        <div className="sm:col-span-3 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, city, or address..."
            className="w-full pl-12 pr-6 py-4 text-[#FAF3E1] bg-transparent rounded-2xl focus:outline-none transition-all text-sm font-medium placeholder-[#FAF3E1]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 rounded-2xl text-[#FAF3E1] font-black uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1]/[0.1] transition-all">
          <Filter size={16} className="text-[#FA8112]" />
          Filters
        </button>
      </div>

      {/* --- Table / Content Section --- */}
      {loading ? (
        <div className="min-h-[500px] flex flex-col items-center justify-center bg-[#FAF3E1]/[0.01] rounded-[2.5rem] border border-dashed border-[#F5E7C6]/10">
          <Loader2 className="h-10 w-10 animate-spin text-[#FA8112] mb-4" />
          <p className="text-[#FAF3E1]/20 font-black uppercase tracking-[0.3em] text-[10px]">
            Syncing parking database...
          </p>
        </div>
      ) : filteredParkings.length > 0 ? (
        <div className="bg-[#FAF3E1]/[0.01] rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm overflow-hidden p-2">
          <ParkingTable
            data={filteredParkings}
            onRefresh={refresh}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <div className="min-h-[500px] flex flex-col items-center justify-center bg-[#FAF3E1]/[0.01] rounded-[2.5rem] border border-[#F5E7C6]/10 text-center p-12 relative overflow-hidden">
          <div className="bg-[#FAF3E1]/[0.03] p-8 rounded-full mb-6 text-[#FAF3E1]/10">
            <MapPin size={48} />
          </div>
          <h3 className="text-xl font-black text-[#FAF3E1] uppercase tracking-tight">
            No Locations Found
          </h3>
          <p className="text-[#FAF3E1]/30 max-w-xs mx-auto mt-3 text-sm font-medium italic">
            We couldn't find any parking zones matching your criteria. Try
            adjusting your search or add a new zone.
          </p>
        </div>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Parking Location"
        message="Delete this parking location? This action will permanently remove the asset."
        confirmLabel="Delete"
        intent="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setParkingToDelete(null);
        }}
      />
    </div>
  );
};

export default ParkingList;

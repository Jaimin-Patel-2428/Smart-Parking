import React, { useState, useEffect } from "react";
import { Save, X, MapPin, Car, DollarSign, Info } from "lucide-react";
import toast from "react-hot-toast";

const ParkingForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalSlots: "",
    basePrice: "",
    status: "Active",
  });

  // Sync state if initialData is provided (for Editing)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = {
      ...formData,
      totalSlots: Number(formData.totalSlots),
      basePrice: Number(formData.basePrice),
    };

    // Simple validation
    if (cleanData.totalSlots <= 0 || cleanData.basePrice < 0) {
      toast.error("Please enter valid numbers for slots and price.");
      return;
    }

    onSubmit(cleanData);
  };

  // Shared Input Style
  const inputStyle =
    "w-full p-3.5 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-xl text-[#FAF3E1] placeholder-[#FAF3E1]/20 focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 outline-none transition-all font-medium";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#222222]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Name Input */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.1em] flex items-center gap-2">
            <Info size={14} className="text-[#FA8112]" /> Parking Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Grand Plaza Underground"
            className={inputStyle}
            required
          />
        </div>

        {/* Location Input */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.1em] flex items-center gap-2">
            <MapPin size={14} className="text-[#FA8112]" /> Address / City
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Sector 4, New York"
            className={inputStyle}
            required
          />
        </div>

        {/* Slots Input */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.1em] flex items-center gap-2">
            <Car size={14} className="text-[#FA8112]" /> Total Capacity
          </label>
          <input
            name="totalSlots"
            value={formData.totalSlots}
            onChange={handleChange}
            type="number"
            placeholder="Total slots"
            className={inputStyle}
            required
          />
        </div>

        {/* Pricing Input */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.1em] flex items-center gap-2">
            <DollarSign size={14} className="text-[#FA8112]" /> Hourly Rate
          </label>
          <input
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            type="number"
            placeholder="Price per hour"
            className={inputStyle}
            required
          />
        </div>

        {/* Status Select */}
        <div className="space-y-2.5 md:col-span-2">
          <label className="text-[11px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.1em]">
            Operating Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`${inputStyle} appearance-none cursor-pointer`}
          >
            <option value="Active" className="bg-[#222222]">
              Active / Operational
            </option>
            <option value="Maintenance" className="bg-[#222222]">
              Under Maintenance
            </option>
            <option value="Closed" className="bg-[#222222]">
              Temporarily Closed
            </option>
          </select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-8 border-t border-[#F5E7C6]/10">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest text-[#FAF3E1]/40 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/[0.05] transition-all flex items-center gap-2"
        >
          <X size={16} /> Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="px-10 py-3 bg-[#FA8112] text-[#222222] rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#FAF3E1] shadow-lg shadow-[#FA8112]/10 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <Save size={16} />{" "}
              {initialData ? "Update Location" : "Save Location"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ParkingForm;

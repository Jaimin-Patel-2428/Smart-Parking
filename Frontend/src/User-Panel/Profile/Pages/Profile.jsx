import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import useProfile from "../Hooks/useProfile";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";
import {
  Loader2,
  User,
  Bike,
  Car,
  Trash2,
  Edit3,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Plus,
  ChevronRight,
  MapPin,
} from "lucide-react";

// --- Reusable Themed Components ---

const Button = ({
  children,
  onClick,
  disabled,
  className = "",
  type = "button",
  variant = "default",
  size = "md",
}) => {
  const variants = {
    default:
      "bg-[#FA8112] text-[#222222] hover:bg-[#FA8112]/90 shadow-lg shadow-[#FA8112]/20",
    outline:
      "border border-[#F5E7C6]/10 bg-transparent text-[#FAF3E1]/60 hover:bg-[#FA8112]/10 hover:text-[#FA8112]",
    ghost: "text-[#FAF3E1]/40 hover:text-red-400 hover:bg-red-500/10",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${variants[variant]} ${sizes[size]} rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
};

const ProfileCard = ({ children, title, icon: Icon, className = "" }) => (
  <div
    className={`bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2.5rem] overflow-hidden ${className}`}
  >
    <div className="px-8 py-6 border-b border-[#F5E7C6]/5 flex items-center gap-3">
      <div className="p-2 bg-[#FA8112]/10 rounded-lg">
        <Icon size={18} className="text-[#FA8112]" />
      </div>
      <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-[0.2em] italic">
        {title}
      </h3>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

// --- Main Profile Component ---

const Profile = () => {
  const { user } = useAuth();
  const {
    profile,
    vehicles,
    loading,
    error,
    updating,
    updateProfile,
    addVehicle,
    deleteVehicle,
    refreshProfile,
  } = useProfile();

  const [activeTab, setActiveTab] = useState("details");
  const [editingProfile, setEditingProfile] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [editData, setEditData] = useState({
    fullName: profile?.fullName || '',
    mobile: profile?.mobile || '',
    address: profile?.address || ''
  });
  const [newVehicle, setNewVehicle] = useState({
    vehicleType: "4wheel",
    vehicleNumber: "",
    color: "",
    model: "",
  });

  // Update editData when profile loads
  useEffect(() => {
    if (profile) {
      setEditData({
        fullName: profile.fullName || '',
        mobile: profile.mobile || '',
        address: profile.address || ''
      });
    }
  }, [profile]);

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(editData);
    if (result.success) {
      toast.success("Identity Updated");
      setEditingProfile(false);
      refreshProfile();
    } else {
      toast.error(result.error);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    const result = await addVehicle(newVehicle);
    if (result.success) {
      toast.success("Asset Registered");
      setNewVehicle({
        vehicleType: "4wheel",
        vehicleNumber: "",
        color: "",
        model: "",
      });
      refreshProfile();
    } else {
      toast.error(result.error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteVehicle = async () => {
    if (!vehicleToDelete) return;
    const vehicleId = vehicleToDelete;
    setShowDeleteConfirm(false);
    setVehicleToDelete(null);

    const result = await deleteVehicle(vehicleId);
    if (result.success) {
      toast.success("Asset Removed");
      refreshProfile();
    } else {
      toast.error(result.error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#FA8112]" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20">
          Syncing Identity...
        </p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Security Profile | Smart-Park</title>
      </Helmet>

      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tight">
              User <span className="text-[#FA8112]">Identity</span>
            </h1>
            <p className="text-[#FAF3E1]/40 font-bold flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] italic">
              Manage your credentials and mobility assets
            </p>
          </div>
          <Button onClick={refreshProfile} variant="outline" size="sm">
            Sync Data
          </Button>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="flex p-1.5 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/5 rounded-2xl w-full md:w-fit">
          {["details", "vehicles"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-[#FA8112] text-[#222222] italic shadow-lg shadow-[#FA8112]/20"
                  : "text-[#FAF3E1]/20 hover:text-[#FAF3E1]/40"
              }`}
            >
              {tab === "details"
                ? "Account Profile"
                : `Registered Assets (${vehicles.length})`}
            </button>
          ))}
        </div>

        {/* Profile Details Tab */}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Quick Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/5 rounded-[2.5rem] p-10 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#FA8112]" />
                <div className="relative inline-block mb-6">
                  <div className="h-24 w-24 bg-[#FA8112] rounded-[2rem] flex items-center justify-center text-[#222222] shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                    <User size={40} strokeWidth={2.5} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-[#222222] border-4 border-[#1a1a1a] rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                </div>
                <h2 className="text-2xl font-black text-[#FAF3E1] italic tracking-tighter uppercase">
                  {profile?.fullName}
                </h2>
                <p className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em] mt-1 italic">
                  Verified Account
                </p>

                <div className="mt-8 pt-8 border-t border-[#F5E7C6]/5 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#FAF3E1]/40 font-bold">
                    <Mail size={14} className="text-[#FA8112]" />{" "}
                    {profile?.email}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#FAF3E1]/40 font-bold">
                    <Phone size={14} className="text-[#FA8112]" />{" "}
                    {profile?.mobile || "No Mobile Linked"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Edit Form */}
            <div className="lg:col-span-2">
              <ProfileCard title="Credential Management" icon={ShieldCheck}>
                <form onSubmit={handleProfileEdit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                        Full Name
                      </label>
                      <input
                        value={editData.fullName}
                        onChange={(e) =>
                          setEditData({ ...editData, fullName: e.target.value })
                        }
                        className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                        Mobile Access
                      </label>
                      <input
                        value={editData.mobile}
                        onChange={(e) =>
                          setEditData({ ...editData, mobile: e.target.value })
                        }
                        className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                        Default Address
                      </label>
                      <div className="relative">
                        <MapPin
                          size={16}
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20"
                        />
                        <input
                          placeholder="Link home/office address"
                          value={editData.address}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              address: e.target.value,
                            })
                          }
                          className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={updating}
                    className="w-full md:w-fit"
                  >
                    {updating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Update Identity"
                    )}
                  </Button>
                </form>
              </ProfileCard>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left: Add Vehicle */}
            <div className="xl:col-span-5">
              <ProfileCard title="Register New Asset" icon={Plus}>
                <form onSubmit={handleAddVehicle} className="space-y-6">
                  <div className="flex gap-4">
                    {["2wheel", "4wheel"].map((type) => (
                      <label key={type} className="flex-1 cursor-pointer group">
                        <input
                          type="radio"
                          name="vehicleType"
                          value={type}
                          checked={newVehicle.vehicleType === type}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              vehicleType: e.target.value,
                            })
                          }
                          className="hidden"
                        />
                        <div
                          className={`p-4 rounded-2xl border text-center transition-all ${
                            newVehicle.vehicleType === type
                              ? "bg-[#FA8112] border-[#FA8112] text-[#222222]"
                              : "bg-[#FAF3E1]/5 border-[#F5E7C6]/10 text-[#FAF3E1]/40 group-hover:bg-[#FAF3E1]/10"
                          }`}
                        >
                          {type === "2wheel" ? (
                            <Bike size={24} className="mx-auto" />
                          ) : (
                            <Car size={24} className="mx-auto" />
                          )}
                          <p className="text-[8px] font-black uppercase mt-2">
                            {type === "2wheel" ? "Bike" : "Car"}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                      Plate Number
                    </label>
                    <input
                      value={newVehicle.vehicleNumber}
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          vehicleNumber: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="e.g. GJ01AB1234"
                      className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all placeholder:opacity-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                        Color
                      </label>
                      <input
                        value={newVehicle.color}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            color: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#FA8112] ml-1">
                        Model
                      </label>
                      <input
                        value={newVehicle.model}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            model: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={updating} className="w-full">
                    Register Vehicle
                  </Button>
                </form>
              </ProfileCard>
            </div>

            {/* Right: Asset List */}
            <div className="xl:col-span-7">
              <ProfileCard title="Active Fleet" icon={Car}>
                {vehicles.length === 0 ? (
                  <div className="text-center py-20 bg-[#FAF3E1]/[0.01] rounded-[2rem] border border-dashed border-[#F5E7C6]/10">
                    <Bike className="h-12 w-12 mx-auto mb-4 opacity-10" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
                      No assets linked
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle._id}
                        className="group flex items-center justify-between p-5 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-3xl hover:border-[#FA8112]/30 transition-all"
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className={`p-4 rounded-2xl ${vehicle.vehicleType === "2wheel" ? "bg-blue-500/10 text-blue-400" : "bg-[#FA8112]/10 text-[#FA8112]"}`}
                          >
                            {vehicle.vehicleType === "2wheel" ? (
                              <Bike size={24} />
                            ) : (
                              <Car size={24} />
                            )}
                          </div>
                          <div>
                            <p className="text-xl font-black text-[#FAF3E1] italic tracking-tighter leading-none">
                              {vehicle.vehicleNumber}
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/20 mt-1">
                              {vehicle.model || "Standard"} •{" "}
                              {vehicle.color || "Generic"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteVehicle(vehicle._id)}
                            className="p-3 rounded-xl bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ProfileCard>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle? This action cannot be undone."
        confirmLabel="Delete"
        intent="danger"
        onConfirm={confirmDeleteVehicle}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setVehicleToDelete(null);
        }}
      />
    </>
  );
};

export default Profile;

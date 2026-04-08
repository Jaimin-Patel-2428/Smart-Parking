import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  Shield,
  User as UserIcon,
  Save,
  CheckCircle2,
} from "lucide-react";
import { userService } from "../Services/userService";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(id);
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await userService.updateUser(id, formData);
      setUser(res.data);
      setIsEditing(false);
      toast.success("User profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 border-4 border-[#FA8112] border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em] text-[10px]">
          Decrypting User Profile...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
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
        <button
          onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
          className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-lg active:scale-95 ${
            isEditing
              ? "bg-[#FA8112] text-[#222222] shadow-[#FA8112]/10"
              : "bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 text-[#FAF3E1] hover:bg-[#FAF3E1]/[0.1]"
          }`}
        >
          {isEditing ? (
            <>
              <Save size={18} /> Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Card: Profile Overview */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-[#FAF3E1]/[0.02] rounded-[2.5rem] border border-[#F5E7C6]/10 p-10 text-center shadow-sm relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA8112]/5 blur-3xl pointer-events-none" />

            <div
              className={`h-24 w-24 mx-auto rounded-[2rem] flex items-center justify-center mb-6 border transition-colors ${
                user.role === "admin"
                  ? "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20"
                  : "bg-[#FAF3E1]/[0.05] text-[#FAF3E1] border-[#F5E7C6]/10"
              }`}
            >
              {user.role === "admin" ? (
                <Shield size={40} />
              ) : (
                <UserIcon size={40} />
              )}
            </div>
            <h2 className="text-2xl font-black text-[#FAF3E1] tracking-tighter uppercase">
              {user.name}
            </h2>
            <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase tracking-[0.25em] mt-2">
              System {user.role}
            </p>

            <div className="mt-10 pt-10 border-t border-[#F5E7C6]/5 flex justify-around">
              <div>
                <p className="text-3xl font-black text-[#FAF3E1] tracking-tighter">
                  {user.totalBookings}
                </p>
                <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest mt-1">
                  Bookings
                </p>
              </div>
              <div>
                <div
                  className={`text-2xl font-black mb-1 ${user.status === "active" ? "text-[#FA8112]" : "text-[#FAF3E1]/20"}`}
                >
                  {user.status === "active" ? (
                    <CheckCircle2 className="mx-auto" size={32} />
                  ) : (
                    "••"
                  )}
                </div>
                <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
                  Status
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Detailed Information */}
        <div className="md:col-span-2">
          <div className="bg-[#FAF3E1]/[0.02] rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm overflow-hidden h-full">
            <div className="p-8 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.02]">
              <h3 className="text-xs font-black text-[#FAF3E1] uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="h-5 w-1 bg-[#FA8112] rounded-full" />
                Account Intelligence
              </h3>
            </div>

            <div className="p-10 grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {/* Field: Name */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
                  Identity Handle
                </label>
                {isEditing ? (
                  <input
                    className="w-full p-4 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl text-[#FAF3E1] focus:border-[#FA8112] outline-none transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-black text-[#FAF3E1] text-sm flex items-center gap-3">
                    <UserIcon size={16} className="text-[#FA8112]" />{" "}
                    {user.name}
                  </p>
                )}
              </div>

              {/* Field: Email */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
                  Digital Address
                </label>
                <p className="font-black text-[#FAF3E1] text-sm flex items-center gap-3">
                  <Mail size={16} className="text-[#FA8112]" /> {user.email}
                </p>
              </div>

              {/* Field: Phone */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
                  Secure Comms
                </label>
                {isEditing ? (
                  <input
                    className="w-full p-4 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl text-[#FAF3E1] focus:border-[#FA8112] outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-black text-[#FAF3E1] text-sm flex items-center gap-3">
                    <Phone size={16} className="text-[#FA8112]" />{" "}
                    {user.phone || "UNREGISTERED"}
                  </p>
                )}
              </div>

              {/* Field: Role Toggle */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest">
                  Access Level
                </label>
                {isEditing ? (
                  <select
                    className="w-full p-4 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl text-[#FAF3E1] outline-none focus:border-[#FA8112] appearance-none cursor-pointer"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user" className="bg-[#222222]">
                      Standard User
                    </option>
                    <option value="admin" className="bg-[#222222]">
                      Administrator
                    </option>
                  </select>
                ) : (
                  <p className="font-black text-[#FAF3E1] text-sm flex items-center gap-3">
                    <Shield size={16} className="text-[#FA8112]" />{" "}
                    {user.role.toUpperCase()}
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="sm:col-span-2 pt-10 border-t border-[#F5E7C6]/5 flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3 text-[#FAF3E1]/20 text-[10px] font-black uppercase tracking-widest">
                  <Calendar size={14} className="text-[#FA8112]" />
                  <span>
                    Registry Date:{" "}
                    <span className="text-[#FAF3E1]/60">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#FAF3E1]/20 text-[10px] font-black uppercase tracking-widest">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse" />
                  <span>
                    Last Modified:{" "}
                    <span className="text-[#FAF3E1]/60">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

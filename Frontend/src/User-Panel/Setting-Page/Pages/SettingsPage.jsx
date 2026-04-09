import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Bell,
  Zap,
  Clock,
  AppWindow,
  ShieldAlert,
  Loader2,
  Sliders,
} from "lucide-react";
import toast from "react-hot-toast";

// Hooks
import useSettings from "../Hooks/useSettings";
import useUpdateSettings from "../Hooks/useUpdateSettings";
import useDeleteAccount from "../Hooks/useDeleteAccount";

// Components
import NotificationSettings from "../Components/NotificationSettings";
import ParkingPreferences from "../Components/ParkingPreferences";
import ReminderSettings from "../Components/ReminderSettings";
import AutoFeatures from "../Components/AutoFeatures";
import AppPreferences from "../Components/AppPreferences";
import DangerZone from "../Components/DangerZone";
import DeleteAccountModal from "../Components/DeleteAccountModal";
import OTPVerificationModal from "../Components/OTPVerificationModal";

const SettingsPage = () => {
  const { settings, setSettings, loading } = useSettings();
  const { handleUpdate, savingSection } = useUpdateSettings(setSettings);
  const { step, deleting, handleSendOTP, handleVerifyOTP, handleDeleteAccount } =
    useDeleteAccount();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Effect to notify user of step changes in the deletion process
  useEffect(() => {
    if (step === "otp") {
      toast.success("Security Code Sent to Email", {
        style: {
          background: "#222",
          color: "#FAF3E1",
          border: "1px solid #FA8112",
        },
      });
    }
    if (step === "verified") {
      toast.error("Identity Verified: High Security Mode", {
        icon: "⚠️",
        style: {
          background: "#1a1a1a",
          color: "#ef4444",
          border: "1px solid #ef4444",
        },
      });
    }
  }, [step]);

  const onConfirmDelete = async () => {
    const loadingToast = toast.loading("Executing Purge Protocol...");
    try {
      await handleDeleteAccount();
      localStorage.clear();
      toast.success("Account Purged Successfully", { id: loadingToast });
      navigate("/auth/login", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Purge Failed: System Error", {
        id: loadingToast,
      });
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#FA8112]" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20">
          Initializing System Config...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* 1. Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#FA8112]/10 p-2 rounded-xl">
              <Settings className="text-[#FA8112]" size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tight italic uppercase">
              System <span className="text-[#FA8112]">Config</span>
            </h1>
          </div>
          <p className="text-[#FAF3E1]/30 font-bold flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] ml-12 italic">
            Optimize your parking experience and app behavior
          </p>
        </div>
      </header>

      {/* 2. Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Primary Features */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-[#FAF3E1]/3 border border-[#F5E7C6]/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8">
              <Bell size={20} className="text-[#FA8112]" />
              <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-[0.2em] italic">
                Notifications
              </h3>
                  {savingSection === "notifications" && (
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#FA8112]">
                      Saving
                    </span>
                  )}
            </div>
            <NotificationSettings settings={settings} onChange={handleUpdate} />
          </section>

          <section className="bg-[#FAF3E1]/3 border border-[#F5E7C6]/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8">
              <Sliders size={20} className="text-[#FA8112]" />
              <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-[0.2em] italic">
                Parking Preferences
              </h3>
                  {savingSection === "preferences" && (
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#FA8112]">
                      Saving
                    </span>
                  )}
            </div>
            <ParkingPreferences settings={settings} onChange={handleUpdate} />
          </section>

          <section className="bg-[#FAF3E1]/3 border border-[#F5E7C6]/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8">
              <Zap size={20} className="text-[#FA8112]" />
              <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-[0.2em] italic">
                Smart Features
              </h3>
                  {savingSection === "autoFeatures" && (
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#FA8112]">
                      Saving
                    </span>
                  )}
            </div>
            <AutoFeatures settings={settings} onChange={handleUpdate} />
          </section>
        </div>

        {/* Right Column: Utility & Maintenance */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-[#FAF3E1]/3 border border-[#F5E7C6]/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8">
              <Clock size={20} className="text-[#FA8112]" />
              <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-[0.2em] italic">
                Reminders
              </h3>
                  {savingSection === "reminders" && (
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#FA8112]">
                      Saving
                    </span>
                  )}
            </div>
            <ReminderSettings settings={settings} onChange={handleUpdate} />
          </section>

          <section className="bg-[#FAF3E1]/3 border border-[#F5E7C6]/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8">
              <AppWindow size={20} className="text-[#FA8112]" />
              <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-[0.2em] italic">
                Interface
              </h3>
                  {savingSection === "appSettings" && (
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#FA8112]">
                      Saving
                    </span>
                  )}
            </div>
            <AppPreferences settings={settings} onChange={handleUpdate} />
          </section>

          <section className="bg-red-500/2 border border-red-500/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert size={20} className="text-red-500" />
              <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.2em] italic">
                Danger Zone
              </h3>
            </div>
            <DangerZone
              onDelete={() => {
                setShowDeleteModal(true);
                toast("Authorization Required", { icon: "🔒" });
              }}
            />
          </section>
        </div>
      </div>

      {/* 🧾 Delete Account Flow Modals */}
      {showDeleteModal && step === "idle" && (
        <DeleteAccountModal
          onSendOTP={handleSendOTP}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {step === "otp" && <OTPVerificationModal onVerify={handleVerifyOTP} />}

      {step === "verified" && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 backdrop-blur-md bg-[#222222]/80 animate-in zoom-in duration-300">
          <div className="bg-[#1a1a1a] border border-red-500/20 rounded-[2.5rem] p-10 max-w-sm w-full text-center space-y-6 shadow-2xl shadow-red-500/10">
            <ShieldAlert
              size={48}
              className="text-red-500 mx-auto animate-pulse"
            />
            <div className="space-y-2">
              <h4 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
                Final Protocol
              </h4>
              <p className="text-[10px] text-[#FAF3E1]/40 leading-relaxed uppercase font-black tracking-widest">
                Identity verified. Proceeding will <br />{" "}
                <span className="text-red-500">permanently purge</span> all
                mobility data.
              </p>
            </div>
            <button
              onClick={onConfirmDelete}
              disabled={deleting}
              className="w-full py-4 bg-red-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all active:scale-95"
            >
              {deleting ? "Purging..." : "Confirm Purge"}
            </button>
            <button
              onClick={() => {
                toast("Protocol Aborted", { icon: "🛡️" });
                window.location.reload();
              }}
              className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest hover:text-[#FAF3E1] transition-colors"
            >
              Abort Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

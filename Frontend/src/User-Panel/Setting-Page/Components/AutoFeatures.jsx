import React from "react";
import { Zap, CornerUpRight, LogOut, Info } from "lucide-react";

const AutoFeatures = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange("autoFeatures", { ...settings.autoFeatures, [key]: value });
  };

  const FeatureToggle = ({ id, label, description, icon: Icon, checked }) => (
    <div className="flex items-start justify-between p-5 bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-2xl hover:border-[#FA8112]/20 transition-all group">
      <div className="flex gap-4">
        <div
          className={`p-3 rounded-xl transition-colors ${
            checked
              ? "bg-[#FA8112]/20 text-[#FA8112]"
              : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20"
          }`}
        >
          <Icon size={18} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-[#FAF3E1] uppercase tracking-widest italic">
            {label}
          </p>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-tighter leading-relaxed max-w-45">
            {description}
          </p>
        </div>
      </div>

      {/* Premium Toggle Switch */}
      <button
        onClick={() => handleChange(id, !checked)}
        className={`relative w-11 h-6 rounded-full mt-1 transition-all duration-300 ${
          checked ? "bg-[#FA8112]" : "bg-[#FAF3E1]/10"
        }`}
      >
        <div
          className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-[#222222] transition-all duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureToggle
          id="autoExtend"
          label="Auto Extend"
          description="Automatically adds 30 mins if your session is about to expire."
          icon={CornerUpRight}
          checked={settings.autoFeatures?.autoExtend || false}
        />

        <FeatureToggle
          id="autoRelease"
          label="Auto Release"
          description="Instantly frees up your slot once the vehicle sensors detect exit."
          icon={LogOut}
          checked={settings.autoFeatures?.autoRelease || false}
        />
      </div>

      {/* Technical Footer */}
      <div className="bg-[#FA8112]/5 p-4 rounded-2xl flex gap-3 border border-[#FA8112]/10">
        <Info size={16} className="text-[#FA8112] shrink-0 mt-0.5" />
        <p className="text-[9px] font-black uppercase tracking-widest text-[#FA8112]/60 leading-normal">
          Automation protocols rely on live sensor data. Ensure your vehicle's
          smart-tag is active for 100% precision.
        </p>
      </div>
    </div>
  );
};

export default AutoFeatures;

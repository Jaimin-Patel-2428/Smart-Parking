import React from "react";
import { ChevronRight, Cpu } from "lucide-react";

const SettingsSection = ({ title, children }) => {
  return (
    <div className="group relative">
      {/* 1. Section Header: Tactical Style */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-4">
          {/* Vertical Brand Accent */}
          <div className="w-1 h-6 bg-[#FA8112] rounded-full shadow-[0_0_12px_rgba(250,129,18,0.4)]" />

          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter group-hover:text-[#FA8112] transition-colors duration-300">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-black text-[#FAF3E1]/10 uppercase tracking-[0.3em]">
                System Module
              </span>
              <div className="h-px w-8 bg-[#FAF3E1]/5" />
            </div>
          </div>
        </div>

        {/* Decorative Technical Detail */}
        <div className="hidden md:flex items-center gap-2 opacity-10">
          <Cpu size={12} className="text-[#FAF3E1]" />
          <span className="text-[8px] font-black uppercase tracking-widest">
            v4.0_Config
          </span>
        </div>
      </div>

      {/* 2. Content Body: Glass-Morphism Wrapper */}
      <div className="relative overflow-hidden bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-[2.5rem] p-8 backdrop-blur-sm transition-all duration-500 group-hover:border-[#F5E7C6]/10 group-hover:bg-[#FAF3E1]/4">
        {/* Subtle Internal Glow */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#FA8112] opacity-0 blur-[100px] group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" />

        {/* The Child Components (NotificationSettings, etc.) */}
        <div className="relative z-10">{children}</div>
      </div>

      {/* 3. Section Divider (Optional, for vertical rhythm) */}
      <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-[#F5E7C6]/5 to-transparent" />
    </div>
  );
};

export default SettingsSection;

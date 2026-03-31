import React from "react";

const Tabs = ({
  activeTab,
  onTabChange,
  tabs = ["Current", "Upcoming", "History"],
}) => {
  return (
    <div className="inline-flex p-1.5 bg-[#FAF3E1]/[0.03] backdrop-blur-xl border border-[#F5E7C6]/5 rounded-2xl w-full md:w-fit">
      {tabs.map((tab) => {
        const isActive = activeTab.toLowerCase() === tab.toLowerCase();

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab.toLowerCase())}
            className={`
              relative flex-1 md:flex-none md:min-w-[120px] py-2.5 px-6 
              text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-xl
              ${
                isActive
                  ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/20 italic"
                  : "text-[#FAF3E1]/30 hover:text-[#FAF3E1]/60 hover:bg-[#FAF3E1]/5"
              }
            `}
          >
            {tab}

            {/* Animated Dot for Active State */}
            {isActive && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112]"></span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;

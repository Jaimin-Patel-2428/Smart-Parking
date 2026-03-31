import React from "react";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#222222] text-[#FAF3E1] flex flex-col">
      {/* Premium Top Navbar */}
      <Navbar />

      {/* Main Content Scroll Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-0 md:py-10 pb-28 lg:pb-12 mx-auto w-full">
        {children}
      </main>

      {/* Mobile-only Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </nav>
    </div>
  );
};

export default UserLayout;

import React from "react";
import { Calendar, Zap, CreditCard, Activity } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = ({ stats }) => {
  // Guard clause for empty stats
  if (!stats)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-[2rem] bg-[#FAF3E1]/5 animate-pulse"
          />
        ))}
      </div>
    );

  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      change: 12.5,
      icon: Calendar,
      color: "bg-[#FA8112]", // Your Brand Orange
    },
    {
      title: "Active Sessions",
      value: stats.activeBookings || 0,
      change: 4.2,
      icon: Activity,
      color: "bg-emerald-500", // Success Green
    },
    {
      title: "Total Expenditure",
      value: `₹${Number(stats.totalSpent || 0).toFixed(0)}`,
      change: 18.1,
      icon: CreditCard,
      color: "bg-blue-500", // Info Blue
    },
    {
      title: "Peak Usage",
      value: `${(stats.avgBookingValue || 0).toFixed(0)}h`,
      change: -2.4,
      icon: Zap,
      color: "bg-purple-500", // Power Purple
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {" "}
      {cards.map((card, index) => (
        <div
          key={index}
          className="transition-all duration-500"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <StatsCard {...card} />
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

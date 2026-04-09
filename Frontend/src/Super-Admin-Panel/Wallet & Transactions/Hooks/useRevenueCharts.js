import { useState, useEffect, useCallback } from "react";
import { walletService } from "../Services/walletService";

export const useRevenueCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [viewType, setViewType] = useState("daily"); // 'daily' or 'monthly'
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await walletService.getRevenueAnalytics(viewType);
      
      // Your backend returns: data: [ { _id: {year, month, day}, total }, ... ]
      // We format this for a Charting library (like Recharts or Chart.js)
      const formattedData = res.data.data.map(item => ({
        label: viewType === "daily" 
          ? `${item._id.day}/${item._id.month}` 
          : `${item._id.month}/${item._id.year}`,
        amount: item.total
      }));

      setChartData(formattedData);
    } catch (err) {
      console.error("Revenue Analytics Error:", err);
    } finally {
      setLoading(false);
    }
  }, [viewType]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { chartData, viewType, setViewType, loading };
};
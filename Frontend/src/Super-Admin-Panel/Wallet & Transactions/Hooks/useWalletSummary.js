import { useState, useEffect, useCallback } from "react";
import { walletService } from "../Services/walletService";

export const useWalletSummary = () => {
  const [stats, setStats] = useState(null);
  const [topUsers, setTopUsers] = useState([]);
  const [parkingRevenue, setParkingRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [summaryRes, topUsersRes, parkingRes] = await Promise.all([
        walletService.getSummary(),
        walletService.getTopUsers(),
        walletService.getParkingRevenue(),
      ]);

      setStats(summaryRes.data.data);
      setTopUsers(topUsersRes.data.data);
      setParkingRevenue(parkingRes.data.data);
    } catch (err) {
      setError(err.message || "Failed to load wallet dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    topUsers,
    parkingRevenue,
    loading,
    error,
    refresh: fetchDashboardData,
  };
};

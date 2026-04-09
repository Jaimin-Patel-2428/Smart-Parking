import api from "../../../Shared/Services/api";

export const walletService = {
  // GET /api/super-admin/wallet/summary
  getSummary: () => api.get("/super-admin/wallet/summary"),

  // GET /api/super-admin/wallet/users (All user balances)
  getAllUserWallets: () => api.get("/super-admin/wallet/users"),

  // GET /api/super-admin/wallet/revenue?type=daily|monthly
  getRevenueAnalytics: (type = "daily") =>
    api.get(`/super-admin/wallet/revenue`, { params: { type } }),

  // GET /api/super-admin/wallet/top-users
  getTopUsers: () => api.get("/super-admin/wallet/top-users"),

  // GET /api/super-admin/wallet/parking-revenue
  getParkingRevenue: () => api.get("/super-admin/wallet/parking-revenue"),

  // GET /api/super-admin/wallet/failed-transactions
  getFailedTransactions: () =>
    api.get("/super-admin/wallet/failed-transactions"),
};

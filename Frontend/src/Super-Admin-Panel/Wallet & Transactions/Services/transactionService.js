import api from "../../../Shared/Services/api";

export const transactionService = {
  // GET /api/super-admin/transactions (with filters)
  getTransactions: (params) => api.get("/super-admin/transactions", { params }),

  // POST /api/super-admin/transactions/add-money
  addMoney: (amount) =>
    api.post("/super-admin/transactions/add-money", { amount }),

  // GET /api/super-admin/transactions/:id
  getTransactionById: (id) => api.get(`/super-admin/transactions/${id}`),

  // GET /api/super-admin/transactions/total-revenue
  getTotalRevenue: () => api.get("/super-admin/transactions/total-revenue"),
};

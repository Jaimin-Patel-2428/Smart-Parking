import api from "../../../Shared/Services/api";

const dashboardService = {
  getUserDashboard: () => api.get(`/user/dashboard`)
};

export default dashboardService;

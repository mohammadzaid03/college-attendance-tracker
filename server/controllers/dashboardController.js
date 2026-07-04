const { getDashboardData } = require("../services/dashboardService");

// Get Dashboard
const getDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardData();

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
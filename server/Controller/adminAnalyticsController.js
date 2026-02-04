const Order = require("../Schema/orders-schema");
const User = require("../Schema/user-schema");

const getAdminKPIs = async (req, res) => {
  try {
    if (req.userInfo.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 1️⃣ Today’s revenue
    const todayRevenueAgg = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const todayRevenue = todayRevenueAgg[0]?.revenue || 0;

    // 2️⃣ This month’s revenue
    const monthlyRevenueAgg = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const monthlyRevenue = monthlyRevenueAgg[0]?.revenue || 0;

    // 3️⃣ Total orders
    const totalOrders = await Order.countDocuments();

    // 4️⃣ Total users
    const totalUsers = await User.countDocuments({ role: "user" });

    return res.status(200).json({
      todayRevenue,
      monthlyRevenue,
      totalOrders,
      totalUsers,
    });
  } catch (error) {
    console.error("Admin KPI error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminKPIs };

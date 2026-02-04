import { useEffect, useState } from "react";
import axios from "axios";

const AdminKPI = () => {
  const [kpi, setKpi] = useState({
    todayRevenue: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchKPIs = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/admin/kpis",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setKpi(res.data);
    };

    fetchKPIs();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <KpiCard title="Today's Revenue" value={`₹${kpi.todayRevenue}`} />
      <KpiCard title="Monthly Revenue" value={`₹${kpi.monthlyRevenue}`} />
      <KpiCard title="Total Orders" value={kpi.totalOrders} />
      <KpiCard title="Total Users" value={kpi.totalUsers} />
    </div>
  );
};

const KpiCard = ({ title, value }) => (
  <div style={{
    padding: "20px",
    borderRadius: "10px",
    background: "#f5f5f5",
    minWidth: "180px",
    textAlign: "center"
  }}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

export default AdminKPI;

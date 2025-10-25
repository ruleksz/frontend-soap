import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    memberCount: 0,
    projectCount: 0,
    surveyCount: 0,
    propertyCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Gagal mengambil data dashboard admin:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container" style={styles.page}>
      <h1 style={styles.title}>Dashboard Admin</h1>

      <div style={styles.cards}>
        <div style={styles.card}>
          👥 <strong>Jumlah Member:</strong> {stats.memberCount}
        </div>
        <div style={styles.card}>
          🏗️ <strong>Jumlah Proyek:</strong> {stats.projectCount}
        </div>
        <div style={styles.card}>
          📋 <strong>Jumlah Survey:</strong> {stats.surveyCount}
        </div>
        <div style={styles.card}>
          🏠 <strong>Jumlah Properti:</strong> {stats.propertyCount}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7fc",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    color: "#1e3a8a",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "40px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

export default DashboardAdmin;

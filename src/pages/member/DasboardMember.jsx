import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const DashboardMember = () => {
    const [data, setData] = useState({
        nama_member: "",
        projectCount: 0,
        jumlah_followup: 0,
        rate: 0,
    });

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const res = await api.get("/member-dashboard");
                setData(res.data);
            } catch (err) {
                console.error("Gagal mengambil data dashboard member:", err);
            }
        };
        fetchMemberData();
    }, []);

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Dashboard Member</h1>
            <p style={styles.subtitle}>
                Selamat datang, <strong>{data.nama_member}</strong>
            </p>

            <div style={styles.cards}>
                <div style={styles.card}>
                    🏗️ <strong>Jumlah Proyek:</strong> {data.projectCount}
                </div>
                <div style={styles.card}>
                    💬 <strong>Follow Up CRM:</strong> {data.jumlah_followup}
                </div>
                <div style={styles.card}>
                    ⭐ <strong>Rate Kinerja:</strong> {data.rate}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
    },
    title: {
        textAlign: "center",
        color: "#0f172a",
    },
    subtitle: {
        textAlign: "center",
        marginTop: "-10px",
        color: "#334155",
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

export default DashboardMember;

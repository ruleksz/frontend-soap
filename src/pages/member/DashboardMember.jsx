import { useEffect, useState } from "react";
import api from "../../api/apiClient";
import { Users, Building2, ClipboardList, Home } from "lucide-react";

export default function DashboardMember() {
    const [stats, setStats] = useState({
        memberCount: 0,
        projectCount: 0,
        surveyCount: 0,
        propertyCount: 0,
    });

    const [memberName, setMemberName] = useState("");

    useEffect(() => {
        // 🔹 Ambil data member dari localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && (user.nama || user.name)) {
            setMemberName(user.nama || user.name);
        }

        // 🔹 Ambil data statistik dari backend
        const fetchStats = async () => {
            try {
                const res = await api.get("/dashboard");
                setStats(res.data);
            } catch (err) {
                console.error("Gagal mengambil data dashboard member:", err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        {
            title: "Jumlah Leads",
            count: stats.cabuyCount,
            icon: <Users size={32} />,
            color: "from-blue-500 to-blue-700",
        },
        {
            title: "Jumlah Proyek",
            count: stats.projectCount,
            icon: <Building2 size={32} />,
            color: "from-green-500 to-green-700",
        },
        {
            title: "Jumlah Survey",
            count: stats.surveyCount,
            icon: <ClipboardList size={32} />,
            color: "from-yellow-500 to-yellow-700",
        },
        {
            title: "Jumlah Properti",
            count: stats.propertyCount,
            icon: <Home size={32} />,
            color: "from-purple-500 to-purple-700",
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-8">
                Selamat Datang,{" "}
                <span className="text-blue-600">
                    {memberName || "Member"}
                </span>{" "}
                👋
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1`}
                    >
                        <div className="flex items-center justify-between">
                            {card.icon}
                            <div className="text-right">
                                <h2 className="text-lg font-semibold">{card.title}</h2>
                                <p className="text-3xl font-bold mt-1">{card.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

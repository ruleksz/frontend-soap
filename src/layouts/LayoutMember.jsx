import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Users,
    Building2,
    Home,
    LogOut,
} from "lucide-react";

export default function LayoutMember() {
    const navigate = useNavigate();
    const [memberName, setMemberName] = useState("");

    // 🔒 Proteksi halaman member
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!token || user.source !== "member") {
            navigate("/login", { replace: true });
        } else {
            setMemberName(user.nama || "Member");
        }

        // 🧹 Cegah tombol "Back" ke login
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = () => {
            window.history.pushState(null, "", window.location.href);
        };
        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [navigate]);

    // 🚪 Fungsi logout aman
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // 🧹 Bersihkan riwayat & arahkan ke login
        window.location.replace("/");
    };

    const menuItems = [
        { name: "Dashboard", path: "/member/dashboard", icon: LayoutDashboard },
        { name: "Data Leads", path: "/member/leads", icon: Users },
        { name: "Data Properti", path: "/member/properti-saya", icon: Building2 },
        { name: "Leader", path: "/member/leader", icon: Users },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white flex flex-col">
                <div className="p-6 text-center border-b border-blue-700">
                    <h1 className="text-2xl font-bold">🏡 Member Panel</h1>
                    <p className="text-sm text-blue-200 mt-2">
                        Selamat datang, <span className="font-semibold">{memberName}</span> 👋
                    </p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-blue-100 hover:bg-blue-700"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-blue-700">
                    <button
                        onClick={logout}
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 w-full py-2 rounded-lg font-semibold transition"
                    >
                        <LogOut size={18} /> Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white m-4 rounded-2xl shadow-md p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

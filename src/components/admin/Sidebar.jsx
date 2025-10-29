// src/components/admin/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, Users, ClipboardList, Building2, LogOut, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
    const location = useLocation();

    const menus = [
        { to: "/admin/dashboard", icon: <Home />, label: "Dashboard" },
        { to: "/admin/member", icon: <Users />, label: "Member" },
        { to: "/admin/properti", icon: <Building2 />, label: "Properti" },
        { to: "/admin/survey", icon: <ClipboardList />, label: "Survey" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-blue-900 text-white flex flex-col shadow-lg">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-700">
                <LayoutDashboard className="w-6 h-6" />
                <h1 className="text-lg font-bold">Admin Panel</h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menus.map((menu) => (
                    <Link
                        key={menu.to}
                        to={menu.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === menu.to
                                ? "bg-blue-700 text-white font-semibold"
                                : "text-blue-200 hover:bg-blue-800"
                            }`}
                    >
                        <div className="w-5 h-5">{menu.icon}</div>
                        <span>{menu.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="px-6 py-4 border-t border-blue-700">
                <button className="flex items-center gap-2 text-sm hover:text-red-400 transition">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>
        </aside>
    );
}

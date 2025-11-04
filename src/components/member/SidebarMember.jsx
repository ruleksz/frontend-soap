// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Building2, Home, ClipboardList } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/member/dashboard", icon: LayoutDashboard },
    { name: "Leads", path: "/member/leads", icon: Users },
    { name: "Properti", path: "/member/properti", icon: Building2 },
    { name: "Leader", path: "/member/leader", icon: ClipboardList },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-700 to-cyan-600 text-white flex flex-col sticky top-0 h-screen">
      <div className="p-6 text-center border-b border-blue-500">
        <h1 className="text-2xl font-bold">👤 Member Panel</h1>
        <p className="text-sm text-blue-100 mt-2">Selamat datang</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-cyan-500 text-white shadow-md" : "text-blue-100 hover:bg-blue-600"}`
              }
            >
              <Icon size={18} /> {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-50 bg-blue-700 text-white min-h-screen p-6 flex flex-col justify-between transition-all duration-300 ease-in-out">
      <div>
        <h2 className="text-2xl font-bold mb-6">Marketing Panel</h2>
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard" 
            className="block hover:bg-blue-600 rounded px-3 py-2">
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/members" 
            className="block hover:bg-blue-600 rounded px-3 py-2">
              👥 Members
            </Link>
          </li>
          <li>
            <Link to="/leads" className="block hover:bg-blue-600 rounded px-3 py-2">
              🧾 Leads
            </Link>
          </li>
        </ul>
      </div>
      <p className="text-sm text-gray-200 mt-4">© 2025 Marketing Team</p>
    </aside>
  );
}

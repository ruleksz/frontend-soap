import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-cyan-400 to-orange-400 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://www.xaviermarks.com/assets/images/logo-xm.png"
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6 font-semibold text-white">
          <li><a href="/dashboard" className="hover:text-gray-100">Dashboard</a></li>
          <li><a href="/home" className="hover:text-gray-100">Home</a></li>
          <li><a href="#" className="hover:text-gray-100">Home</a></li>
          <li><a href="#" className="hover:text-gray-100">Home</a></li>
          <li><a href="#" className="hover:text-gray-100">Home</a></li>
        </ul>

        {/* Tombol kanan */}
        <div className="hidden md:flex gap-3 items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </div>

        {/* Tombol menu (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-cyan-500 text-white px-6 pb-4 space-y-2">
          <a href="#" className="block hover:text-gray-100">Home</a>
          <a href="#" className="block hover:text-gray-100">Home</a>
          <a href="#" className="block hover:text-gray-100">Home</a>
          <a href="#" className="block hover:text-gray-100">Home</a>
          <a href="#" className="block hover:text-gray-100">Home</a>
          <div className="pt-2 border-t border-white/40">
            <button className="w-full bg-blue-600 py-2 rounded mt-2">Sign In</button>
          </div>
        </div>
      )}
    </nav>
  );
}
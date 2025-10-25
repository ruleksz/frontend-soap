import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-orange-400 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src="../assets/hero.jpg"
          alt="Logo"
          className="w-8 h-8"
        />
        <span className="font-bold text-lg">MyPortfolio</span>
      </div>

      <div className="flex space-x-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#projects" className="hover:underline">
          Projects
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </nav>
  );
}

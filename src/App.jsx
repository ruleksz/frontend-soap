import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di atas */}
      <Navbar />

      {/* Konten utama */}
      <main className="flex-1 bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        Capstone Project - Marketing Dashboard © 2024
      </footer>
    </div>
  );
}

export default App;
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Bagian Konten Portfolio */}
      <main className="flex-1 bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang di Portfolio Saya
        </h1>
        <p className="text-gray-600 max-w-xl text-center mb-8">
          Ini adalah halaman portfolio yang berisi karya dan pengalaman saya.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </main>

      <Footer />
    </div>
  );
}

// ✅ Import
import { useEffect, useState } from "react";
import gambar1Image from "../assets/gambar1.jpg";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  // ✅ State untuk menyimpan data properti
  const [properti, setProperti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Ambil data dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properti");
        if (!response.ok) throw new Error("Gagal mengambil data properti");
        const data = await response.json();
        console.log("📦 Data dari backend:", data); // <== Tambahkan ini

        // Jika backend kirim { data: [...] }, ambil bagian data-nya saja
        const propertiesArray = Array.isArray(data) ? data : data.data || [];
        setProperti(propertiesArray);
      } catch (err) {
        console.error(err);
        setError("Tidak dapat memuat data properti. Pastikan server backend berjalan.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  return (
    <section className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* ✅ Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh]"
        style={{
          backgroundImage: `url(${gambar1Image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Temukan Properti Impianmu 🔑
          </h1>

          {/* 🔍 Search Bar */}
          <div className="bg-white rounded-full p-2 w-full max-w-xl flex items-center shadow-md">
            <input
              type="text"
              placeholder="Cari rumah, apartemen, atau lokasi..."
              className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700"
            />
            <button className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Property List Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Daftar Properti Unggulan
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Memuat data properti...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && properti.length === 0 && (
          <p className="text-center text-gray-500">Belum ada properti tersedia.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properti.map((p) => (
            <div
              key={p.id_properti}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={p.image || "/no-image.jpg"}
                alt={p.nama_properti}
                className="h-40 w-full object-cover rounded-lg mb-3"

              />

              <h3 className="text-lg font-semibold text-gray-800">{p.nama_properti}</h3>
              <p className="text-sm text-gray-500">{p.location}</p>
              <p className="text-blue-700 font-bold mt-1">{p.price}</p>
              <p className="text-sm text-gray-600 mt-1 flex-grow">
                {p.deskripsi}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/property/${p.id}`}
                  className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Lihat Detail
                </Link>
                <Link
                  to="/lead/form"
                  className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
                >
                  Saya Tertarik
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ CTA Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-orange-400 py-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Ingin Menjadi Agen Properti?</h3>
        <p className="mb-6">
          Gabung bersama kami dan dapatkan akses ke ribuan calon pembeli potensial.
        </p>
        <Link
          to="/lead/form"
          className="bg-white text-cyan-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100"
        >
          Daftar Sekarang
        </Link>
      </div>
    </section>
  );
}

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

  // untuk leads
  const [showModal, setShowModal] = useState(false);
  const [selectedProperti, setSelectedProperti] = useState(null);
  const [leadName, setLeadName] = useState("");
  const [leadKontak, setLeadKontak] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

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


  const handleSendLead = async (e) => {
    e.preventDefault();
    if (!leadName || !leadKontak) return;

    setSending(true);
    try {
      const payload = {
        nama_cabuy: leadName,
        kontak: leadKontak,
        status: "Baru", // sesuai controller lama
        tanggal_follow_up: new Date(),
        tanggal_masuk: new Date(),
      };

      const response = await fetch("http://localhost:5000/api/cabuy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Gagal mengirim data leads");
      setSuccess(true);

      // 🟢 Arahkan ke WhatsApp member (gunakan no_hp dari properti)
      setTimeout(() => {
        const waNumber = selectedProperti?.Member?.no_hp || "628123456789";
        window.open(
          `https://wa.me/${waNumber}?text=Halo,%20saya%20${encodeURIComponent(
            leadName
          )}%20tertarik%20dengan%20properti%20${encodeURIComponent(
            selectedProperti?.nama_properti || "ini"
          )}`,
          "_blank"
        );
        setShowModal(false);
        setLeadName("");
        setLeadKontak("");
        setSuccess(false);
      }, 1000);
    } catch (err) {
      console.error("❌ Error kirim leads:", err);
      alert("Gagal mengirim data leads. Pastikan server backend berjalan.");
    } finally {
      setSending(false);
    }
  };


  return (
    <section className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* ✅ Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh]"
        style={{ backgroundImage: `url(${gambar1Image})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Temukan Properti Impianmu 🔑
          </h1>
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

        {loading && <p className="text-center text-gray-500">Memuat data properti...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
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
              <p className="text-sm text-gray-600 mt-1 flex-grow">{p.deskripsi}</p>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/properti/${p.id_properti}`}
                  className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Lihat Detail
                </Link>
                {/* 🆕 Ganti tombol ini jadi popup leads */}
                <button
                  onClick={() => {
                    setSelectedProperti(p);
                    setShowModal(true);
                  }}
                  className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
                >
                  Saya Tertarik
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🆕 Modal Leads */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Tertarik dengan {selectedProperti?.nama_properti}?
            </h3>

            {!success ? (
              <form onSubmit={handleSendLead} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nama</label>
                  <input
                    type="text"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="text"
                    value={leadKontak}
                    onChange={(e) => setLeadKontak(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {sending ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-green-600 text-center font-medium mt-4">
                Data berhasil dikirim! 🚀
              </p>
            )}
          </div>
        </div>
      )}

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
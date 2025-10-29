// ✅ Import
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PropertiDetail() {
    const { id } = useParams(); // Ambil ID properti dari URL
    const [properti, setProperti] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ✅ Ambil data properti berdasarkan ID
    useEffect(() => {
        const fetchProperti = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/properti/${id}`);
                if (!response.ok) throw new Error("Gagal memuat data properti");
                const data = await response.json();

                // Sesuaikan jika backend kirim { data: {...} }
                setProperti(data.data || data);
            } catch (err) {
                console.error(err);
                setError("Tidak dapat memuat detail properti. Pastikan server backend berjalan.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperti();
    }, [id]);

    if (loading)
        return <p className="text-center text-gray-500 mt-20">Memuat detail properti...</p>;

    if (error)
        return <p className="text-center text-red-500 mt-20">{error}</p>;

    if (!properti)
        return <p className="text-center text-gray-500 mt-20">Properti tidak ditemukan.</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <Link to="/" className="text-blue-600 text-sm hover:underline inline-block mb-4">
                    ← Kembali ke Daftar Properti
                </Link>

                <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6">
                    <img
                        src={properti.image}
                        alt={properti.nama_properti}
                        className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                    />
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{properti.nama_properti}</h1>
                        <p className="text-gray-500">{properti.location}</p>
                        <p className="text-blue-700 text-lg font-semibold my-3">
                            {properti.Rumah?.harga
                                ? `Rp ${Number(properti.Rumah.harga).toLocaleString("id-ID")}`
                                : "Harga belum tersedia"}
                        </p>
                        <p className="text-gray-700 font-semibold">
                            {properti.Rumah?.tipe_rumah
                                ? `Tipe Rumah: ${properti.Rumah.tipe_rumah}`
                                : "Tipe rumah belum ditentukan"}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">{properti.deskripsi}</p>
                        <Link
                            to="/lead/form"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Saya Tertarik
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

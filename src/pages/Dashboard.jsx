import { useState, useEffect } from "react";

export default function Dashboard() {
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/member"); // sesuaikan URL API
        if (!res.ok) {
          throw new Error("Gagal mengambil data dari API");
        }
        const data = await res.json();
        setLeadsData(data); // pastikan data dari backend dalam bentuk array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Xavier Marks
      </h1>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Leads</p>
          <h2 className="text-3xl font-bold text-blue-600">{leadsData.length}</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Member Aktif</p>
          <h2 className="text-3xl font-bold text-green-600">56</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Leads Closing</p>
          <h2 className="text-3xl font-bold text-orange-600">
            {leadsData.filter((lead) => lead.status === "Closing").length}
          </h2>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Data Leads Terbaru
        </h3>

        {loading ? (
          <p className="text-gray-500 text-center">Memuat data...</p>
        ) : error ? (
          <p className="text-red-600 text-center">Error: {error}</p>
        ) : leadsData.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada data leads.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">Jabatan</th>
                <th className="py-2 px-4 border">Kontak</th>
                <th className="py-2 px-4 border">Id Leader</th>
                <th className="py-2 px-4 border">Id Admin</th>
              </tr>
            </thead>
            <tbody>
              {leadsData.map((item, index) => (
                <tr key={item.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{item.nama_member}</td>
                  <td
                    className={`py-2 px-4 border font-semibold ${
                      item.jabatan === "Member"
                        ? "text-green-600"
                        : item.jabatan === "Leader"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.jabatan}
                  </td>
                  <td className="py-2 px-4 border">{item.kontak}</td>
                  <td className="py-2 px-4 border">{item.leader_id ? item.leader_id : "Null"}</td>
                  <td className="py-2 px-4 border">{item.Admin?.nama_admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

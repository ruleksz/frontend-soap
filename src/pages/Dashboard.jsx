export default function Dashboard() {
  // Contoh data dummy, bisa diganti nanti dengan data dari backend / API
  const leadsData = [
    { id: 1, nama: "Andi Pratama", status: "Closing", tanggal: "10 Okt 2025" },
    { id: 2, nama: "Sinta Dewi", status: "Follow Up", tanggal: "09 Okt 2025" },
    { id: 3, nama: "Budi Hartono", status: "Lost", tanggal: "08 Okt 2025" },
    { id: 4, nama: "Rina Mulyani", status: "Prospect", tanggal: "07 Okt 2025" },
  ];

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Xavier Marks
      </h1>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Leads</p>
          <h2 className="text-3xl font-bold text-blue-600">124</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Member Aktif</p>
          <h2 className="text-3xl font-bold text-green-600">56</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-500">Leads Closing</p>
          <h2 className="text-3xl font-bold text-orange-600">32</h2>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Data Leads Terbaru
        </h3>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border">No</th>
              <th className="py-2 px-4 border">Nama</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((item, index) => (
              <tr key={item.id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{item.nama}</td>
                <td
                  className={`py-2 px-4 border font-semibold ${
                    item.status === "Closing"
                      ? "text-green-600"
                      : item.status === "Lost"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-2 px-4 border">{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

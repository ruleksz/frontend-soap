// ✅ Import
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PropertiAdmin() {
  const [propertiList, setPropertiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Ambil semua data properti dari backend
  useEffect(() => {
    const fetchProperti = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properti");
        if (!response.ok) throw new Error("Gagal memuat data properti");
        const data = await response.json();

        setPropertiList(data.data || []); // sesuai format backend kamu
      } catch (err) {
        console.error(err);
        setError("Tidak dapat memuat data properti. Pastikan server backend berjalan.");
      } finally {
        setLoading(false);
      }
    };
    const handleAdd = () => {
        setSelectedMember(null);
        setIsModalOpen(true);
    };

    const handleEdit = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus member ini?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/member/${id}`);
            fetchMembers();
        } catch (err) {
            console.error("Gagal menghapus member:", err);
        }
    };

    fetchProperti();
  }, []);

  

  if (loading)
    return <p className="text-center text-gray-500 mt-20">Memuat data properti...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="p-6">
      

      {propertiList.length === 0 ? (
        <p className="text-gray-500">Belum ada data properti.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Nama Properti</th>
                <th className="px-4 py-2 text-left">Deskripsi</th>
                <th className="px-4 py-2 text-left">Tipe Rumah</th>
                <th className="px-4 py-2 text-left">Harga</th>
                <th className="px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {propertiList.map((prop) => (
                <tr key={prop.id_properti} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold">{prop.nama_properti}</td>
                  <td className="px-4 py-2">{prop.image ?(
                    <img src={prop.image} alt={prop.nama_properti} className="w-20 h-20 object-cover rounded" />
                  ) : (
                    <p className="text-gray-500">Tidak ada gambar</p>
                  )}</td>
                  <td className="px-4 py-2">{prop.Rumah?.tipe_rumah || "-"}</td>
                  <td className="px-4 py-2 text-blue-700 font-semibold">
                    {prop.Rumah?.harga
                      ? `Rp ${Number(prop.Rumah.harga).toLocaleString("id-ID")}`
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/properti/${prop.id_properti}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Lihat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

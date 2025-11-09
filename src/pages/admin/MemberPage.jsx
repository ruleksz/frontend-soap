import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import MemberFormModal from "../../components/MemberFormModal";

export default function MemberPage() {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(null);

  // Ambil data member dari backend
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/member");
      const payload = res?.data ?? [];
      // log satu sample untuk debugging struktur objek (bisa dihapus nanti)
      console.log("sample member object:", payload[0]);
      setMembers(Array.isArray(payload) ? payload : payload.data ?? []);
    } catch (err) {
      console.error("Gagal mengambil data member:", err?.response?.data ?? err.message);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAdd = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // pastikan id yang diterima adalah id_member (bukan index atau id)
  const handleDelete = async (id_member) => {
    if (!id_member) {
      console.warn("handleDelete: id_member is falsy:", id_member);
      alert("ID member tidak valid");
      return;
    }

    const confirmDelete = window.confirm("Yakin ingin menghapus member ini?");
    if (!confirmDelete) return;

    try {
      setLoadingDelete(id_member);
      await axios.delete(`http://localhost:5000/api/member/${id_member}`);
      // update UI lokal tanpa fetch full lagi:
      setMembers((prev) => prev.filter((m) => (m.id_member ?? m.id) !== id_member));
    } catch (err) {
      console.error("Gagal menghapus member:", err?.response?.data ?? err.message);
      alert("Gagal menghapus member: " + (err?.response?.data?.message || err?.message || err));
    } finally {
      setLoadingDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Data Member</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} /> Tambah Member
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="p-3 border-b">No</th>
              <th className="p-3 border-b">Nama</th>
              <th className="p-3 border-b">Telepon</th>
              <th className="p-3 border-b">Jabatan</th>
              <th className="p-3 border-b">Admin</th>
              <th className="p-3 border-b">Senior Leader</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center p-6 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : members.length > 0 ? (
              members.map((member, index) => {
                // gunakan id_member (fallback ke id jika backend pakai id)
                const idMember = member?.id_member ?? member?.id;
                return (
                  <tr key={idMember ?? `member-${index}`} className="hover:bg-blue-50">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{member?.nama_member ?? "-"}</td>
                    <td className="p-3 border-b">{member?.kontak ?? "-"}</td>
                    <td className="p-3 border-b">{member?.jabatan ?? "-"}</td>
                    <td className="p-3 border-b">{member?.Admin?.nama_admin ?? "-"}</td>
                    <td className="p-3 border-b">{member?.leader?.nama_member ?? "-"}</td>
                    <td className="p-3 border-b">{member?.email ?? "-"}</td>
                    <td className="p-3 border-b text-center">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-yellow-500 hover:text-yellow-600 mr-3"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(idMember)}
                        className="text-red-500 hover:text-red-600"
                        disabled={loadingDelete === idMember}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500 italic">
                  Belum ada data member
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <MemberFormModal
          onClose={() => setIsModalOpen(false)}
          onSaved={() => {
            setIsModalOpen(false);
            fetchMembers();
          }}
          member={selectedMember}
        />
      )}
    </div>
  );
}

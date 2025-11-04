import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import LeadsFormModal from "../../components/LeadsFormModal";

export default function LeadsMember() {
    const [leads, setLeads] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    // Ambil data member dari backend
    const fetchLeads = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/cabuy");
            setLeads(res.data);
        } catch (err) {
            console.error("Gagal mengambil data leads:", err);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleAdd = () => {
        setSelectedLead(null);
        setIsModalOpen(true);
    };

    const handleEdit = (lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus leads ini?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/cabuy/${id}`);
            fetchLeads();
        } catch (err) {
            console.error("Gagal menghapus leads:", err);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Data Leads</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <Plus size={18} /> Tambah Leads
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-100 text-blue-900">
                            <th className="p-3 border-b">No</th>
                            <th className="p-3 border-b">Nama</th>
                            <th className="p-3 border-b">Telepon</th>
                            <th className="p-3 border-b">Tanggal Follow Up</th>
                            <th className="p-3 border-b">Tanggal Masuk</th>
                            <th className="p-3 border-b">Statusr</th>
                            <th className="p-3 border-b">Email</th>
                            <th className="p-3 border-b text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length > 0 ? (
                            leads.map((cabuy, index) => (
                                <tr key={cabuy.id} className="hover:bg-blue-50">
                                    <td className="p-3 border-b">{index + 1}</td>
                                    <td className="p-3 border-b">{cabuy.nama_cabuy}</td>
                                    <td className="p-3 border-b">{cabuy.kontak}</td>
                                    <td className="p-3 border-b">{cabuy.tanggal_follow_up}</td>
                                    <td className="p-3 border-b">{cabuy.tanggal_masuk}</td>
                                    <td className="p-3 border-b">{cabuy.status}</td>
                                    <td className="p-3 border-b text-center">
                                        <button
                                            onClick={() => handleEdit(lead)}
                                            className="text-yellow-500 hover:text-yellow-600 mr-3"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(lead.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500 italic">
                                    Belum ada data Leads
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {isModalOpen && (
                <LeadsFormModal
                    onClose={() => setIsModalOpen(false)}
                    onSaved={fetchLeads}
                    cabuy={selectedLead}
                />
            )}
        </div>
    );
}

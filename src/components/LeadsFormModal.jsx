import { useState, useEffect } from "react";
import axios from "axios";

export default function LeadsFormModal({ onClose, onSaved, cabuy }) {
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        id_member: "",
        nama_cabuy: cabuy?.nama_cabuy || "",
        kontak: cabuy?.kontak || "",
        tanggal_follow_up: cabuy?.tanggal_follow_up || "",
        tanggal_masuk: cabuy?.tanggal_masuk || "",
        status: cabuy?.status || "",
    });

    useEffect(() => {
        // 🔹 Ambil daftar member dari backend
        axios
            .get("http://localhost:5000/api/member")
            .then((res) => setMembers(res.data))
            .catch((err) => console.error("Gagal memuat data member:", err));

        // 🔹 Ambil id_member dari localStorage user login
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id_member) {
            setFormData((prev) => ({ ...prev, id_member: user.id_member }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 🔹 Kirim dalam bentuk OBJECT (bukan array)
            const payload = {
                id_member: formData.id_member,
                nama_cabuy: formData.nama_cabuy,
                kontak: formData.kontak,
                status: formData.status,
                tanggal_follow_up: formData.tanggal_follow_up,
                tanggal_masuk: formData.tanggal_masuk,
            };

            console.log("📦 Data yang dikirim:", payload);

            if (cabuy) {
                // Update data leads
                await axios.put(
                    `http://localhost:5000/api/cabuy/${cabuy.id_cabuy}`,
                    payload
                );
            } else {
                // Tambah data leads baru
                await axios.post("http://localhost:5000/api/cabuy", payload);
            }

            onSaved();
            onClose();
        } catch (err) {
            console.error("❌ Gagal menyimpan data leads:", err.response?.data || err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    {cabuy ? "Edit Leads" : "Tambah Leads"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama Leads */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Nama Leads</label>
                        <input
                            type="text"
                            name="nama_cabuy"
                            value={formData.nama_cabuy}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Kontak */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Kontak</label>
                        <input
                            name="kontak"
                            value={formData.kontak}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Tanggal Follow Up */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Tanggal Follow Up</label>
                        <input
                            type="date"
                            name="tanggal_follow_up"
                            value={formData.tanggal_follow_up}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Tanggal Masuk */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Tanggal Masuk</label>
                        <input
                            type="date"
                            name="tanggal_masuk"
                            value={formData.tanggal_masuk}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Leader */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Leader</label>
                        <select
                            name="id_member"
                            value={formData.id_member}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Pilih Leader</option>
                            {members.map((member) => (
                                <option key={member.id_member} value={member.id_member}>
                                    {member.nama_member}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import axios from "axios";

export default function MemberFormModal({ onClose, onSaved, member }) {
    const [leaders, setLeaders] = useState([]);
    const [formData, setFormData] = useState({
        nama_member: member?.nama_member || "",
        kontak: member?.kontak || "",
        jabatan: member?.jabatan || "Member",
        leader_id: member?.leader_id || "",
        email: member?.email || "",
        password: "",
    });

    useEffect(() => {
        // Ambil daftar leader untuk dropdown leader_id
        axios
            .get("http://localhost:5000/api/member?jabatan=Leader")
            .then((res) => setLeaders(res.data))
            .catch((err) => console.error("Gagal memuat data leader:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (member) {
                await axios.put(
                    `http://localhost:5000/api/member/${member.id_member}`,
                    formData
                );
            } else {
                await axios.post("http://localhost:5000/api/member", formData);
            }
            onSaved();
            onClose();
        } catch (err) {
            console.error("Gagal menyimpan data member:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    {member ? "Edit Member" : "Tambah Member"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama Member */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Nama Member</label>
                        <input
                            type="text"
                            name="nama_member"
                            value={formData.nama_member}
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
                        ></input>
                    </div>

                    {/* Jabatan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Jabatan</label>
                        <select
                            name="jabatan"
                            value={formData.jabatan}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                        >
                            <option value="Member">Member</option>
                            <option value="Leader">Leader</option>
                            <option value="Senior leader">Senior leader</option>
                        </select>
                    </div>

                    {/* Leader */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Leader</label>
                        <select
                            name="leader_id"
                            value={formData.leader_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Tidak ada</option>
                            {leaders.map((leader) => (
                                <option key={leader.id_member} value={leader.id_member}>
                                    {leader.nama_member} || {leader.jabatan}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Password */}
                    {!member && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                    )}

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

import { useState, useEffect } from "react";
import axios from "axios";

const baseURL =
  import.meta?.env?.VITE_API_URL || // untuk Vite
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) || // untuk CRA
  "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});


export default function MemberFormModal({ onClose, onSaved, member }) {
  const [leaders, setLeaders] = useState([]);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    nama_member: member?.nama_member || "",
    kontak: member?.kontak || "",
    jabatan: member?.jabatan || "Member",
    leader_id: member?.leader_id ?? "",
    email: member?.email || "",
    password: "",
  });

  useEffect(() => {
    // attach token if available
    const token = localStorage.getItem("token");
    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // ambil daftar leader (support ?jabatan=Leader)
    api.get("/api/member?jabatan=Leader")
      .then((res) => {
        const payload = res?.data ?? [];
        setLeaders(Array.isArray(payload) ? payload : payload.data ?? []);
      })
      .catch((err) => {
        console.error("Gagal memuat data leader:", err?.response?.data ?? err.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      // ambil id_admin dari localStorage.user jika ada
      let id_admin = null;
      try {
        const raw = localStorage.getItem("user");
        if (raw) {
          const u = JSON.parse(raw);
          id_admin = u?.id_admin ?? u?.id ?? null;
        }
      } catch {}

      // siapkan payload sesuai backend
      const payload = {
        nama_member: formData.nama_member,
        email: formData.email,
        password: formData.password,
        jabatan: formData.jabatan,
        kontak: formData.kontak,
        // leader_id harus null untuk Senior leader, otherwise Number or send as-is
        leader_id:
          formData.jabatan === "Senior leader"
            ? null
            : formData.leader_id === "" || formData.leader_id === null
            ? null
            : Number(formData.leader_id),
        id_admin,
      };

      if (member) {
        // update: jangan kirim password bila kosong
        if (!payload.password) delete payload.password;
        await api.put(`/api/member/${member.id_member}`, payload);
      } else {
        await api.post("/api/member", payload);
      }

      if (typeof onSaved === "function") onSaved();
      if (typeof onClose === "function") onClose();
    } catch (err) {
      const serverMsg = err?.response?.data ?? err?.message ?? "Unknown error";
      console.error("Gagal menyimpan data member:", serverMsg);
      setErrorMsg(typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <h3 className="text-xl font-semibold mb-4">{member ? "Edit Member" : "Tambah Member"}</h3>

        {errorMsg && <div className="mb-3 text-sm text-red-700 bg-red-50 p-2 rounded">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... fields sama seperti sebelumnya (nama, kontak, jabatan, leader, email, password) */}
          {/* copy paste fields dari versi yang sudah kamu pakai; name props harus cocok */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Nama Member</label>
            <input type="text" name="nama_member" value={formData.nama_member} onChange={handleChange} required className="w-full ..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Kontak</label>
            <input name="kontak" value={formData.kontak} onChange={handleChange} required className="w-full ..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Jabatan</label>
            <select name="jabatan" value={formData.jabatan} onChange={handleChange} className="w-full ...">
              <option value="Member">Member</option>
              <option value="Leader">Leader</option>
              <option value="Senior leader">Senior leader</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Leader</label>
            <select name="leader_id" value={formData.leader_id ?? ""} onChange={handleChange} className="w-full ...">
              <option value="">Tidak ada</option>
              {leaders.map(l => (
                <option key={l.id_member ?? l.id} value={l.id_member ?? l.id}>
                  {(l.nama_member ?? l.name) + " || " + (l.jabatan ?? l.role)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full ..." />
          </div>

          {!member && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full ..." />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} disabled={saving} className="px-4 py-2 bg-gray-300 rounded-lg">Batal</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg">{saving ? "Menyimpan..." : "Simpan"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

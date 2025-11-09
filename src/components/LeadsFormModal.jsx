// src/components/LeadsFormModal.jsx
import { useState, useEffect } from "react";
import api from "../api/apiClient";

function formatDateForInput(value) {
  if (!value) return "";
  // jika sudah YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  // parse dan kembalikan YYYY-MM-DD
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function LeadsFormModal({ onClose, onSaved, cabuy }) {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    id_member: "",
    nama_cabuy: cabuy?.nama_cabuy || "",
    kontak: cabuy?.kontak || "",
    tanggal_follow_up: cabuy?.tanggal_follow_up ? formatDateForInput(cabuy.tanggal_follow_up) : "",
    tanggal_masuk: cabuy?.tanggal_masuk ? formatDateForInput(cabuy.tanggal_masuk) : "",
    status: cabuy?.status || "Baru",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/member");
        setMembers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.warn("Gagal memuat daftar member:", err?.response?.data || err.message || err);
      }
    };
    fetchMembers();
  }, []);

  // sync when cabuy prop changes (open edit)
  useEffect(() => {
    setFormData((prev) => ({
      id_member: cabuy?.id_member ?? prev.id_member ?? "",
      nama_cabuy: cabuy?.nama_cabuy ?? prev.nama_cabuy ?? "",
      kontak: cabuy?.kontak ?? prev.kontak ?? "",
      tanggal_follow_up: formatDateForInput(cabuy?.tanggal_follow_up) || prev.tanggal_follow_up || "",
      tanggal_masuk: formatDateForInput(cabuy?.tanggal_masuk) || prev.tanggal_masuk || "",
      status: cabuy?.status ?? prev.status ?? "Baru",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cabuy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.nama_cabuy || !formData.kontak) {
      setErrorMsg("Nama dan Kontak wajib diisi.");
      return;
    }

    // normalize payload: tanggal format yyyy-MM-dd or null
    const payload = {
      id_member: formData.id_member || null,
      nama_cabuy: formData.nama_cabuy,
      kontak: formData.kontak,
      status: formData.status || "Baru",
      tanggal_follow_up: formData.tanggal_follow_up ? formData.tanggal_follow_up : null,
      tanggal_masuk: formData.tanggal_masuk ? formData.tanggal_masuk : null,
    };

    setSubmitting(true);
    try {
      if (cabuy) {
        const id = cabuy.id_cabuy ?? cabuy.id;
        if (!id) throw new Error("ID leads tidak tersedia untuk operasi edit.");
        await api.put(`/cabuy/${id}`, payload);
      } else {
        await api.post("/cabuy", payload);
      }

      onSaved?.();
      onClose?.();
    } catch (err) {
      console.error("Gagal menyimpan data leads:", err);
      console.log("AXIOS ERR status:", err.response?.status);
      console.log("AXIOS ERR data:", err.response?.data);
      setErrorMsg(err.response?.data?.error || err.response?.data?.detail || err.message || "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">{cabuy ? "Edit Leads" : "Tambah Leads"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Nama Leads</label>
            <input
              type="text"
              name="nama_cabuy"
              value={formData.nama_cabuy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Kontak</label>
            <input
              name="kontak"
              value={formData.kontak}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Tanggal Follow Up</label>
            <input
              type="date"
              name="tanggal_follow_up"
              value={formData.tanggal_follow_up || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Tanggal Masuk</label>
            <input
              type="date"
              name="tanggal_masuk"
              value={formData.tanggal_masuk || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              disabled={submitting}
            >
              <option value="Baru">Baru</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Closing">Closing</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Leader / Assigned Agent</label>
            <select
              name="id_member"
              value={formData.id_member ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              disabled={submitting}
            >
              <option value="">— Pilih Agent —</option>
              {members.map((member) => (
                <option key={member.id_member ?? member.id} value={member.id_member ?? member.id}>
                  {member.nama_member ?? member.name ?? `Member ${member.id_member ?? member.id}`}
                </option>
              ))}
            </select>
          </div>

          {errorMsg && <div className="text-sm text-red-600">{errorMsg}</div>}

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400" disabled={submitting}>
              Batal
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={submitting}
            >
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

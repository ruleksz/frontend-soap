// src/pages/member/LeaderMember.jsx
import { useEffect, useState } from "react";
import api from "../../api/apiClient";

export default function LeaderMember() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => { fetchForwarded(); }, []);

  async function fetchForwarded() {
    try {
      const res = await api.get(`/api/leads/forwarded?member_id=${user.id}`); // 🔁 BACKEND CALL
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData([{ id:1, nama:"Budi", property_name:"Rumah A", leader:"Agus", status:"Menunggu Survey" }]);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leads yang Diteruskan</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Properti</th>
              <th className="p-3 text-left">Leader</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length===0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">Belum ada</td></tr>
            ) : data.map(d => (
              <tr key={d.id}>
                <td className="p-3">{d.nama}</td>
                <td className="p-3">{d.property_name}</td>
                <td className="p-3">{d.leader}</td>
                <td className="p-3">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

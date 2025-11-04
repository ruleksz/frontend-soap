// 🆕 src/components/LeadsTable.jsx
export default function LeadsTable({ leads = [], onForward = () => {}, onDelete = () => {} }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-sm">Nama</th>
            <th className="p-3 text-left text-sm">Kontak</th>
            <th className="p-3 text-left text-sm">Properti</th>
            <th className="p-3 text-left text-sm">Status</th>
            <th className="p-3 text-center text-sm">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-sm text-gray-500">Belum ada leads</td>
            </tr>
          )}
          {leads.map((l) => (
            <tr key={l.id}>
              <td className="p-3">{l.nama}</td>
              <td className="p-3">{l.kontak}</td>
              <td className="p-3">{l.property_name || l.property}</td>
              <td className="p-3">{l.status}</td>
              <td className="p-3 text-center space-x-2">
                <button onClick={() => onForward(l)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Forward</button>
                <button onClick={() => onDelete(l.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

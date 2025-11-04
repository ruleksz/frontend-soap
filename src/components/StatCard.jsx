// 🆕 src/components/StatCard.jsx
export default function StatCard({ title, value, icon = null, color = "from-blue-500 to-cyan-500" }) {
  return (
    <div className={`bg-gradient-to-br ${color} text-white p-4 rounded-xl shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-90">{icon}</div>
      </div>
    </div>
  );
}

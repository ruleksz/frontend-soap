import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddMember() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/members", { name, email, password });
            if (res.data.status === "success") {
                setMessage("✅ Member berhasil ditambahkan!");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                setMessage("❌ " + res.data.message);
            }
        } catch (err) {
            console.error("Error saat login:", err);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-center mb-6">Tambah Member</h2>

                {message && <p className="text-center mb-4">{message}</p>}

                <form onSubmit={handleAddMember} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nama"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border w-full px-4 py-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border w-full px-4 py-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border w-full px-4 py-2 rounded"
                        required
                    />
                    <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                        Simpan
                    </button>

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400 mt-2"
                    >
                        Kembali
                    </button>
                </form>
            </div>
        </div>
    );
}

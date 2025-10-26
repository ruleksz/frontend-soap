import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // panggil endpoint login (yang memeriksa admin & member)
            const res = await api.post("/auth/login", { email, password });

            // jika berhasil
            if (res.data && res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                // redirect berdasarkan tabel asal (bukan role manual)
                if (res.data.user.source === "admin") {
                    navigate("/admin/dashboard");
                } else if (res.data.user.source === "member") {
                    navigate("/member/dashboard-member");
                } else {
                    setError("Sumber user tidak dikenali");
                }
            } else {
                setError(res.data.message || "Login gagal");
            }
        } catch (err) {
            console.error("Error saat login:", err);
            setError(err.response?.data?.message || "Terjadi kesalahan koneksi ke server");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
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

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

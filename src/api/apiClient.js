import axios from "axios";

// Buat instance axios agar bisa digunakan di seluruh aplikasi
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Middleware request → tambahkan Authorization token otomatis
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Middleware response → handle error global
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Tangani error umum (misal token kadaluarsa)
        if (error.response && error.response.status === 401) {
            console.warn("Token kadaluarsa, logout otomatis...");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default api;

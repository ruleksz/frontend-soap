import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MemberHome() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "member") navigate("/login");
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800">Halaman Member</h1>
            <p className="text-gray-600 mt-2">
                Selamat datang, {JSON.parse(localStorage.getItem("user"))?.name} 👋
            </p>
        </div>
    );
}

import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user?.source === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
}

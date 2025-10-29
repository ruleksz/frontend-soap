import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import MemberPage from "./pages/admin/MemberPage";
import PropertyDetail from "./pages/PropertiDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <Routes>
      {/* Halaman Home dan Properti hanya bisa diakses kalau belum login */}
      <Route
        path="/"
        element={
          <GuestRoute>
            <Home />
          </GuestRoute>
        }
      />
      <Route
        path="/properti/:id"
        element={
          <GuestRoute>
            <PropertyDetail />
          </GuestRoute>
        }
      />

      {/* Halaman Login juga hanya untuk user yang belum login */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      {/* Halaman Admin hanya untuk user yang sudah login */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="member" element={<MemberPage />} />  {/* Tambahkan ini */}
        {/* Tambahkan route admin lain di sini kalau ada */}
      </Route>

      {/* Jika URL tidak dikenal, arahkan ke home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;

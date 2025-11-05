import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import MemberPage from "./pages/admin/MemberPage";
import PropertyDetail from "./pages/PropertiDetail"; // ✅ untuk detail properti
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import LayoutMember from "./layouts/LayoutMember";
import DashboardMember from "./pages/member/DashboardMember";
import LeadsMember from "./pages/member/LeadsMember";
import LeadsFormModal from "./components/LeadsFormModal";
import PropertiSaya from "./pages/member/PropertiSaya";

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
        <Route path="member" element={<MemberPage />} />
      </Route>

      {/* Halaman Member hanya untuk user yang sudah login */}
      <Route
        path="/member"
        element={
          <ProtectedRoute>
            <LayoutMember />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardMember />} />
        <Route path="leads" element={<LeadsMember />} />
        <Route path="properti-saya" element={<PropertiSaya />} />
        <Route path="properti-saya/:id" element={<PropertyDetail />} /> {/* ✅ Detail properti member */}
      </Route>

      {/* Jika URL tidak dikenal, arahkan ke home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;

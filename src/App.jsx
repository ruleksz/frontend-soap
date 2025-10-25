import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import DashboardMember from "./pages/member/DasboardMember";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/add-member" element={<Members />} />

      {/* Member Routes */}
      <Route path="/member/dashboard-member" element={<DashboardMember />} />
    </Routes>
  );
}

export default App;

import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-grow p-6">
        <Outlet /> {/* Admin pages render here */}
      </main>
    </div>
  );
}
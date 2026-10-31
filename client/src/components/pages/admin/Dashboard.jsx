// the admin dashbaord -> sidebar of links and the chosen admin page in the <Outlet/>
// ONLY logged in admins can view it

import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useUsers } from "../../../context/UsersContext";
import { useAdmin } from "../../../context/AdminContext";
import DashboardLinks from "./DashboardLinks";

// dashboard component -> admin layour with a sidebar and an <Outlet />
export default function Dashboard() {
  const { isAuth, isAdmin, status } = useAuth();
  const { loadUsers } = useUsers();
  const { loadImages } = useAdmin();

  // load users and images at once when admin opens the dashboard
  useEffect(() => {
    if (isAuth && isAdmin) {
      loadUsers();
      loadImages();
    }
  }, [isAuth, isAdmin]);

  //  if its still  checking for saved token  wait instead of a redirect
  if (status === "loading") {
    return (
      <p className="flex items-center gap-3 text-gray-600">
        Validating your credentials
      </p>
    );
  }

  //  not logged in or an admin send abck to home
  if (!isAuth || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  //  onside dashboard then other is th eoutlet
  // it renders the child page like users and add users....
  return (
    <main className="grid overflow-hidden rounded-lg border border-gray-600 md:grid-cols-[14rem_1fr">
      {/* Sidebar */}
      <aside className="bg-cyan-50">
        <DashboardLinks />
      </aside>
      {/* Selected admin page shows the <outlet /> */}
      <section className="min-h-[60vh] bg-amber-50 p-4">
        <h2 className="mb-4 text 2xl font-semibold">Admin Dashboard</h2>
        <Outlet />
      </section>
    </main>
  );
}

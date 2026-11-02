// the admin dashbaord -> sidebar of links and the chosen admin page in the <Outlet/>
// ONLY logged in admins can view it

import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useUsers } from "../../../context/UsersContext";
import { useAdmin } from "../../../context/AdminContext";
import DashboardLinks from "./DashboardLinks";

import logo from "../../../assets/logo-light.png";

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
    <div className="grid min-h-[70vh] overflow-hidden border border-line bg-surface shadow-sm lg:grid-cols-[16rem_1fr]">
      {/* Sidebar */}
      <aside className="flex flex-col gap-1 bg-linear-to-b from-footer to-footer-end  p-2 text-on-footer lg:p-4">
        <img
          src={logo}
          alt="Bob's Garage"
          className="hidden h-16 w-auto self-start lg:block"
        />
        <p className="mb-4 hidden text-xs font-normal tracking-wide text-on-footer/60 uppercase lg:block ">
          Admin
        </p>
        <DashboardLinks />
      </aside>

      {/* Admin Page */}
      <section className="p-6 md:p-8">
        <Outlet />
      </section>
    </div>
  );
}

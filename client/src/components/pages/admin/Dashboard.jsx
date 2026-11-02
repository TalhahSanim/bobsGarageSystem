// Admin Dashboard -> sidebar for links and  selected admin page in the <Outlet/>
// Logged in ADMINS are only able to see it

import { useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useUsers } from "../../../context/UsersContext";
import { useAdmin } from "../../../context/AdminContext";
import DashboardLinks from "./DashboardLinks";
import ToggleTheme from "../../layout/ToggleTheme";
import { FaArrowLeft } from "react-icons/fa";

import logo from "../../../assets/logo-light.png";

// Dashboard component -> admin layer with sidebar and Outlet
export default function Dashboard() {
  const { isAuth, isAdmin, status, user, logout } = useAuth();
  const { loadUsers } = useUsers();
  const { loadImages } = useAdmin();
  const navigate = useNavigate();

  // Load users & Images at oncewhen admin opens dashboard
  useEffect(() => {
    if (isAuth && isAdmin) {
      loadUsers();
      loadImages();
    }
  }, [isAuth, isAdmin]);

  // instead of checking for saved token we wait
  if (status === "loading") {
    return (
      <p className="flex items-center gap-3 text-gray-600">
        Validating Your Credentials...
      </p>
    );
  }

  // Not logged in or an admin then send back to home
  if (!isAuth || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // logout and go back to homepage
  const leave = () => {
    logout();
    navigate("/");
  };

  // First letters of name when a user has no profile photo
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;

  return (
    <div className="grid lg:full-screen lg:-my-10 lg:min-h-screen lg:grid-cols-[16rem_1fr]">
      {/* SideBar-> Full Height on desktop and link row on mobile */}
      <aside className="flex flex-col gap-1 bg-linear-to-r lg:bg-linear-to-b from-footer  to-footer-end p-2 text-on-footer lg:sticky lg:top-0 lg:h-screen lg:p-4">
        {/* Logo to return back home and theme button */}
        <div className="hidden items-center justify-between lg:flex">
          <Link to="/" aria-label="Return Home">
            <img src={logo} alt="Bob's Garage " className="h-16 w-auto" />
          </Link>
          <ToggleTheme className="text-on-footer hover:bg-white/10" />
        </div>
        <p className="mb-4 hidden text-xs font-normal tracking-wide text-on-footer/60 uppercase lg:block">
          Admin
        </p>
        <DashboardLinks />

        {/* Back to home as header hidden on desktop */}
        <Link
          to="/"
          className="mt-auto hidden items-center gap-2 bg-white/20 px-3 py-2.5 text-on-footer no-underline transition-colors hover:bg-white/10 lg:flex"
        >
          <FaArrowLeft aria-hidden="true" /> Back Home
        </Link>

        {/* Confirm who logged in and logout attached to bottom */}
        <div className="mt-2 hidden items-center gap-3 border-t  border-white/20 pt-4 lg:flex">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="size-9 shrink-0 object-cover"
            />
          ) : (
            <span
              className="flex size-9 shrink-0 items-center justify-center bg-white/20 text-sm font-semibold"
              aria-hidden="true"
            >
              {initials}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{user.firstName} [Admin]</p>
            <p className="truncate text-xs text-on-footer/70">{user.email}</p>
          </div>
          <button
            type="button"
            className="shrink-0 bg-danger/50 px-3 py-1.5 text-sm transition-colors hover:bg-danger/20 cursor-pointer"
            onClick={leave}
          >
            Logout
          </button>
        </div>
      </aside>
      {/* Admin  Page*/}
      <section className="pt-6 lg:p-10">
        <Outlet />
      </section>
    </div>
  );
}

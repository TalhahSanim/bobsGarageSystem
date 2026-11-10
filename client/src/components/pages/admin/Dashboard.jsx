// File -> client/src/components/pages/admin/Dashboard.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin Dashboard -> sidebar for links and  selected admin page in the <Outlet/>
// Logged in ADMINS are only able to see it

import { useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useUsers } from "../../../context/UsersContext";
import { useAdmin } from "../../../context/AdminContext";
import DashboardLinks from "./DashboardLinks";
import ToggleTheme from "../../layout/ToggleTheme";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import Footer from "../../layout/Footer";
import lightLogo from "../../../assets/logo-light.png";
import darkLogo from "../../../assets/logo-dark.png";
import { imgSrc } from "../../../utils/imgSrc";

// Dashboard component -> admin layer with sidebar and Outlet
export default function Dashboard() {
  const { isAuth, isAdmin, status, user, logout } = useAuth();
  const { loadUsers } = useUsers();
  const { loadImages } = useAdmin();
  const navigate = useNavigate();

  // Load users & Images at once when admin opens dashboard
  useEffect(() => {
    if (isAuth && isAdmin) {
      loadUsers();
      loadImages();
    }
  }, [isAuth, isAdmin]);

  // instead of checking for saved token we wait
  if (status === "loading") {
    return (
      <p className="flex items-center gap-3 text-muted">
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
    <div className="grid lg:full-screen lg:-my-10 lg:min-h-screen lg:grid-cols-[20rem_1fr]">
      {/* SideBar-> Full Height on desktop and link row on mobile */}
      <aside className="flex flex-col gap-1 bg-linear-to-r lg:bg-linear-to-b from-footer  to-footer-end p-2 text-on-footer lg:sticky lg:top-0 lg:h-screen lg:p-4">
        {/* Logo to return back home and theme button */}
        <div className="hidden items-center justify-between lg:flex">
          <Link to="/" aria-label="Return Home">
            {/* Light logo normally and dark logo when data-theme-"dark" */}
            <img src={lightLogo} alt="" className="h-16 w-auto dark:hidden" />
            <img
              src={darkLogo}
              alt=""
              className="hidden h-16 w-auto dark:block"
            />
          </Link>
        </div>
        <p className="mb-4 hidden text-xs font-normal tracking-wide text-on-footer uppercase lg:block">
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
          {/* Image and Link to open profile for admins */}
          <Link
            to="/profile"
            className="flex min-w-0 flex-1 items-center gap-3 text-on-footer no-underline hover:opacity-80"
          >
            {user.image ? (
              <img
                src={imgSrc(user.image)}
                alt=""
                className="size-9 shrink-0  object-cover ring-2 ring-line"
              />
            ) : (
              <span
                className="flex size-9 shrink-0 items-center justify-center bg-white/20 text-sm font-semibold"
                aria-hidden="true"
              >
                {initials}
              </span>
            )}
            <div className="min-w-0 ">
              <p className="flex items-center gap-2 text-sm">
                <span className="truncate">{user.firstName}</span>
                <span className="badge shrink-0 bg-white/20 text-on-footer">
                  Admin
                </span>
              </p>
              <p className="truncate text-xs text-on-footer" title={user.email}>
                {user.email}
              </p>
            </div>
          </Link>
          <button
            type="button"
            className="flex item-center gap-2 whitespace-nowrap shrink-0 bg-danger/50 px-2.5 py-2.5 text-sm transition-colors hover:bg-danger/20 cursor-pointer font-semibold"
            onClick={leave}
          >
            <FaSignOutAlt className="size-4.5" aria-hidden="true" /> Logout
          </button>
        </div>
      </aside>
      {/* Admin  Page*/}
      {/* Right -> admin on top and footer on bottom */}
      <div className="flex min-w-0 flex-col">
        <section className="flex-1 pt-6 lg:p-10">
          {/* Top bar on top including back home left and theme toggle on the right */}
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <Link to="/" className="btn btn-outline btn-sm">
              <FaArrowLeft aria-hidden="true" /> Back Home
            </Link>
            <ToggleTheme />
          </div>
          <Outlet />
        </section>{" "}
        {/* Footer */}
        <div className="hidden lg:block">
          <Footer embedded />
        </div>
      </div>
    </div>
  );
}

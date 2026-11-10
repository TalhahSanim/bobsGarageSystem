// File -> client/src/components/layout/Header.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
// Website Header -> Logo, Page Links via role, Theme Toggle and Sliding Mobile Sidebar Menu

import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BiSolidCarMechanic, BiSolidInfoSquare } from "react-icons/bi";

import {
  FaBars,
  FaPlus,
  FaTimes,
  FaUsers,
  FaHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaInbox,
  FaComments,
} from "react-icons/fa";
import { PiUserSquareFill } from "react-icons/pi";

import ToggleTheme from "./ToggleTheme";
import { imgSrc } from "../../utils/imgSrc";

import logo from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

// the logout function from auth context
import { useAuth } from "../../context/AuthContext";
import { useEnquiries } from "../../context/EnquiriesContext";

export default function Header() {
  // console.log(branding);  // test to see if it is functional
  const [menuOn, setMenuOn] = useState(false);
  // From authContext is anyone logged in, are they admin status and logout
  const { isAuth, isAdmin, user, logout } = useAuth();

  // Since admin dash has exclusive sidebar so we need to hide this bar
  const { pathname } = useLocation();
  const inAdmin = pathname.startsWith("/admin");

  //  lose menus after link pressed
  const menuClose = () => {
    setMenuOn(false);
  };

  const { unreadCount } = useEnquiries();

  // Log out forget user and close menus
  const leave = () => {
    console.log("Logout Clicked");
    logout();
    menuClose();
  };

  // tells what page your on and active to highlight it
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  // the logo -> light version or dark version when using data-them="dark"
  const brand = (size) => (
    <>
      <img
        src={logo}
        alt="Bob's Garage"
        className={`${size} w-auto dark:hidden`}
      />

      <img
        src={logoDark}
        alt="Bob's Garage"
        className={`${size} hidden w-auto dark:block`}
      />
    </>
  );

  // The page links, used in the desktop bar AND the mobile menu
  const links = (
    <>
      <li>
        <NavLink to="/" end className={linkClass} onClick={menuClose}>
          <IoHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className={linkClass} onClick={menuClose}>
          <BiSolidCarMechanic /> Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={linkClass} onClick={menuClose}>
          <BiSolidInfoSquare /> About
        </NavLink>
      </li>
      {/* Admin links: only for logged in admins */}
      {isAuth && isAdmin && (
        <>
          <li>
            <NavLink
              to="/add-service"
              className={linkClass}
              onClick={menuClose}
            >
              <FaPlus />
              Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className={linkClass} onClick={menuClose}>
              <FaUsers /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/enquiries"
              className={linkClass}
              onClick={menuClose}
            >
              <FaComments /> Enquiries
            </NavLink>
          </li>{" "}
        </>
      )}
      {/* // Customers only and their saved services */}
      {isAuth && !isAdmin && (
        <>
          <li>
            <NavLink to="/saved" className={linkClass} onClick={menuClose}>
              <FaHeart /> Saved
            </NavLink>
          </li>
          <li>
            <NavLink className={linkClass} to="/inbox" onClick={menuClose}>
              <FaInbox />
              Inbox
              {/* Unread replies -> tiny red count dot */}
              {unreadCount > 0 && (
                <span className="ms-1 bg-accent px-2 text-xs font-bold text-on-primary">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  //  Login and register or logout and wide make them fill mobile menu
  const account = (wide) =>
    isAuth ? (
      <>
        {/* Name opens the profile page  */}
        <Link
          to="/profile"
          className={`btn btn-ghost btn-sm ${wide ? "flex-1 py-3" : ""}`}
          onClick={menuClose}
        >
          {/* Their Image or person icon/image */}
          {imgSrc(user?.image) ? (
            <img
              src={imgSrc(user.image)}
              alt=""
              className="size-8 object-cover ring-2 ring-line"
            />
          ) : (
            <PiUserSquareFill className="size-8" aria-hidden="true" />
          )}
          Welcome, {user?.firstName}
        </Link>
        <button
          type="button"
          className={`btn btn-outline btn-sm ${wide ? "flex-1 py-3" : ""}`}
          onClick={leave}
        >
          <FaSignOutAlt aria-hidden="true" /> Logout
        </button>{" "}
      </>
    ) : (
      <>
        <Link
          to="/login"
          className={`btn btn-sm ${wide ? "btn-outline flex-1 py-3" : "btn-ghost"}`}
          onClick={menuClose}
        >
          <FaSignInAlt aria-hidden="true" />
          Login
        </Link>
        <Link
          to="/register"
          className={`btn btn-primary btn-sm ${wide ? "flex-1 py-3" : ""}`}
          onClick={menuClose}
        >
          <FaUserPlus aria-hidden="true" /> Register
        </Link>
      </>
    );

  return (
    <header
      className={`sticky top-0 z-30 bg-nav shadow-sm ${inAdmin ? "lg:hidden" : ""}`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo left */}
        <NavLink to="/" onClick={menuClose} className="shrink-0">
          {brand("h-14")}
        </NavLink>

        {/* Middle page links on desktop mode */}

        <ul className="hidden items-center gap-1 lg:flex">{links}</ul>

        {/* Right -> login/logout,theme and mobile menu */}
        <div className="flex items-center gap-2">
          {" "}
          <div className="hidden items-center gap-2 lg:flex">
            {account(false)}
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-square lg:hidden"
            onClick={() => setMenuOn(true)}
            aria-label="Open Menu"
            aria-expanded={menuOn}
          >
            <FaBars className="size-6" />
          </button>
          <ToggleTheme />
        </div>
      </nav>

      {/* Gradient line under bar */}
      <div className="h-0.75 bg-linear-to-r from-primary to-gradient-end"></div>
      {/* Mobile menu with dark overlay and sliding from left */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${menuOn ? "" : "pointer-events-none"}`}
        inert={!menuOn}
      >
        {/* // overlay */}
        <button
          type="button"
          aria-label="Close Menu"
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${menuOn ? "opacity-100" : "opacity-0"}`}
          onClick={menuClose}
        ></button>
        {/* Panel -> Mobile */}
        <aside
          className={`absolute inset-y-0 left-0 flex w-77.5 max-w-[85vw] flex-col bg-surface p-5 shadow-2xl transition-transform duration-300 ${menuOn ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-6 flex items-center justify-between">
            <NavLink to="/" onClick={menuClose}>
              {brand("h-12")}
            </NavLink>
            <button
              type="button"
              className="btn btn-ghost btn-square"
              onClick={menuClose}
              aria-label="Close Menu"
            >
              <FaTimes className="size-6" />
            </button>
          </div>
          <ul className="flex flex-col gap-1 text-lg">{links}</ul>
          <div className="mt-auto flex gap-2">{account(true)}</div>{" "}
        </aside>{" "}
      </div>
    </header>
  );
}

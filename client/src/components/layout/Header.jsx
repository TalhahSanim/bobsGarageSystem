import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BiSolidCarMechanic } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";

import { MdPalette } from "react-icons/md";
import {
  FaBars,
  FaPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaUsers,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";

import logo from "../../assets/bobsLog.png";

// the logout function from auth context
import { useAuth } from "../../context/AuthContext";

// export default function Header({ branding }) { //! outdated prop
export default function Header() {
  // console.log(branding);  // test to see if it is functional
  const [menuOn, setMenuOn] = useState(false);

  // From authContext is anyone logged in, are they admin status and logout
  const { isAuth, isAdmin, logout } = useAuth();

  //  lose menus after link pressed
  const menuClose = () => {
    setMenuOn(false);
  };

  // Log out forget user and close menus
  const leave = () => {
    console.log("Logout Clicked");
    logout();
    menuClose();
  };

  // tel what page your on ysubg neby active to highlight it
  const linkClass = ({ isActive }) => (isActive ? "menu-active" : "");
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
          <GrStatusInfo /> About
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
              <FaPlus /> Add Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className={linkClass} onClick={menuClose}>
              <FaUsers /> Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-30 bg-neutral text-neutral-content shadow-md">
      <nav className="navbar mx-auto max-w-6xl px-4 ">
        <div className="navbar-start ">
          <NavLink
            to="/"
            className="flex items-center gap-3"
            onClick={menuClose}
          >
            <img src={logo} alt="Bob's Garage logo" className="h-32 w-auto" />
          </NavLink>
        </div>
        {/* Middle page links on desktop mode */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 text-base">{links}</ul>
        </div>
        {/* Right -> login/logout,theme and mobile menu */}
        <div className="navbar-end gap-2">
          {isAuth ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={leave}
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-ghost btn-sm"
                onClick={menuClose}
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-ghost btn-sm "
                onClick={menuClose}
              >
                <FaUserPlus /> Register
              </Link>
            </>
          )}

          {/* Theme Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm btn-square"
              aria-label="choose a theme"
            >
              <MdPalette className="size-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-40 mt-3 w-36 rounded-box bg-base-100 p-2 text-base-content shadow-lg"
            >
              <li>
                <button type="button">Light</button>
              </li>
              <li>
                <button type="button">Dark</button>
              </li>
            </ul>
          </div>

          {/* Mobile menu button which is hidden on large screens */}
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-square lg:hidden"
            onClick={() => setMenuOn(!menuOn)}
            aria-label="Navigation Toggle"
            aria-expanded={menuOn}
          >
            {menuOn ? (
              <FaTimes className="size-5" />
            ) : (
              <FaBars className="size-5" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile menu with same links stacked */}
      {menuOn && (
        <ul className="menu w-full border-t border-neutral-content/10 px-4 pb-4 lg:hidden">
          {links}
        </ul>
      )}
    </header>
  );
}

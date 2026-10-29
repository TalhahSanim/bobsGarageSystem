import { Fragment, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BiSolidCarMechanic } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";

import { IconContext } from "react-icons/lib";
import { MdPalette } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import {
  FaBars,
  FaPlus,
  FaDoorOpen,
  FaSignInAlt,
  FaSignOutAlt,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

import logo from "../../assets/bobsLog.png";

// the logout function from auth context
import { useAuth } from "../../context/AuthContext";

// export default function Header({ branding }) { //! outdated prop
export default function Header() {
  // console.log(branding);  // test to see if it is functional
  const [menuOn, setMenuOn] = useState(false);
  const [themeOn, setThemeOn] = useState(false);

  // From authContext is anyone logged in, are they admin status and logout
  const { isAuth, isAdmin, logout } = useAuth();

  //  lose menus after link pressed
  const menuClose = () => {
    setMenuOn(false);
    setThemeOn(false);
  };

  // Log out forget user and close menus
  const leave = () => {
    console.log("Logout Clicked");
    logout();
    menuClose();
  };
  // Class shared for every every nave to  prevent repetition
  const linkClass =
    "relative flex items-center gap-1 pb-1 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-pink-700 after:transition-all after:duration-300 hover:after:w-full motion-reduce:after:transition-none";
  const itemClass = "block w-full px-4 py-2 text-left hover:bg-garage-dark";

  const adminLinks = (
    <Fragment key="admin">
      <li>
        <Link className={linkClass} to="/add-service" onClick={menuClose}>
          <FaPlus /> Add Service
        </Link>
      </li>

      <li>
        <Link className={linkClass} to="/admin" onClick={menuClose}>
          <FaUsers /> DashBoard
        </Link>
      </li>
    </Fragment>
  );
  // Links for logged in users
  const authLinks = (
    <Fragment key="auth">
      <li>
        <button type="button" className={linkClass} onClick={leave}>
          <FaSignOutAlt /> Logout
        </button>
      </li>
    </Fragment>
  );

  const loginRegisterLinks = (
    <Fragment key="guest">
      <li>
        <Link className={linkClass} to="/login" onClick={menuClose}>
          <FaSignInAlt /> Login
        </Link>
      </li>
      <li>
        <Link className={linkClass} to="/register" onClick={menuClose}>
          <FaSignInAlt /> Register
        </Link>
      </li>
    </Fragment>
  );
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "font-bold after:w-full " : "after:w-0"}`
          }
          onClick={menuClose}
        >
          <IoHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "font-bold after:w-full " : "after:w-0"}`
          }
          onClick={menuClose}
        >
          {" "}
          <BiSolidCarMechanic />
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-service"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "font-bold after:w-full " : "after:w-0"}`
          }
          onClick={menuClose}
        >
          <FaPlus /> Add New Service
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "font-bold after:w-full " : "after:w-0"}`
          }
          onClick={menuClose}
        >
          <GrStatusInfo />
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-30 bg-neutral text-neutral-content shadow-md">
      <nav className="navbar mx-auto max-w-6xl px-4 ">
        <IconContext.Provider
          value={{ size: "3rem", className: "react-icons " }}
        >
          <div className="navbar-start ">
            <NavLink
              to="/"
              className="flex items-center gap-3"
              onClick={menuClose}
            >
              <img
                src={logo}
                alt="Bob's Garage logo"
                className="w-full max-w-sm"
              />
            </NavLink>
          </div>

          {/* Middle page links on desktop mode */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 text-base">{links}</ul>
          </div>
          {/* Hamburger only on the small screens like tablets and mobile */}
          <button
            className="rounded border border-white/40 px-3 py-1 md:hidden cursor-pointer"
            onClick={() => setMenuOn(!menuOn)}
            aria-label="Toggle Navigation Element"
            aria-expanded={menuOn}
          >
            <FaBars />
          </button>

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
                <Link className="btn btn-ghost btn-sm" onClick={menuClose}>
                  <FaSignInAlt /> Login
                </Link>
                <Link className="btn btn-ghost btn-sm" onClick={menuClose}>
                  <FaSignInAlt /> Register
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

          {/* Links will be hidden on mobile unless menuON set to always shown on md+ */}
          <ul
            className={`${menuOn ? "flex" : "hidden"} w-full flex-col gap-2 pt-3 md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:pt-0 bg- px-4 p-6`}
          >
            {/* Admin links for logged in admins */}
            {isAdmin && isAuth ? adminLinks : null}
            {/* Loggedin-> logout. Guest -> Login and Register */}
            {isAuth ? authLinks : loginRegisterLinks}

            {/* Theme options */}
            <li className="relative">
              <button
                className={`${linkClass} after:w-0`}
                onClick={() => setThemeOn(!themeOn)}
                aria-expanded={themeOn}
              >
                <MdPalette />
                Theme
              </button>
              {themeOn && (
                <ul className="absolute right-0 z-10 mt-2 w-36 rounded-md bg-garage py-1 shadow-lg">
                  <li>
                    <button className={itemClass}>Dark</button>
                  </li>
                  <li>
                    <button className={itemClass}>Light</button>
                  </li>
                  <li>
                    <hr className="my-1 border-white/30" />
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </IconContext.Provider>
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

import { useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";

import logo from "../../assets/bobsLog.png";

// the logout function from auth context
import { useAuth } from "../../context/AuthContext";

// export default function Header({ branding }) { //! outdated prop
export default function Header() {
  // logout from authContext
  const { logout } = useAuth();

  // Log out forget user and close menus
  const leave = () => {
    console.log("Logout Clicked");
    logout();
    menuClose();
  };

  // console.log(branding);  // test to see if it is functional
  const [menuOn, setMenuOn] = useState(false);
  const [themeOn, setThemeOn] = useState(false);

  //  lose menus after link pressed
  const menuClose = () => {
    setMenuOn(false);
    setThemeOn(false);
  };

  // Class shared for every every nave to  prevent repetition
  const linkClass =
    "relative flex items-center gap-1 pb-1 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-pink-700 after:transition-all after:duration-300 hover:after:w-full motion-reduce:after:transition-none";
  const itemClass = "block w-full px-4 py-2 text-left hover:bg-garage-dark";
  return (
    <nav className="mb-4 bg-gradient text-white ">
      <IconContext.Provider
        value={{ size: "2.5rem", className: "react-icons " }}
      >
        <div className="flex flex-wrap items-center justify-between px-4 py-7 gap-11 ">
          <NavLink to="/" className="text-xl font-semibold" onClick={menuClose}>
            <img
              src={logo}
              alt="Bob's Garage logo"
              className="w-full max-w-sm"
            />
          </NavLink>

          {/* Hamburger only on the small screens like tablets and mobile */}
          <button
            className="rounded border border-white/40 px-3 py-1 md:hidden cursor-pointer"
            onClick={() => setMenuOn(!menuOn)}
            aria-label="Toggle Navigation Element"
            aria-expanded={menuOn}
          >
            <FaBars />
          </button>

          {/* Links will be hidden on mobile unless menuON set to always shown on md+ */}
          <ul
            className={`${menuOn ? "flex" : "hidden"} w-full flex-col gap-2 pt-3 md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:pt-0 bg- px-4 p-6`}
          >
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
          <ul
            className={`${menuOn ? "flex" : "hidden"} w-full flex-col gap-2 pt-3 md:flex md:w-auto md:flex-row md:items-center   md:gap-4 md:pt-0`}
          >
            <li>
              <NavLink
                className="hover:text-pink-400 text-3xl  px-10.5 py-4  "
                onClick={menuClose}
                to="/login"
              >
                <RiLoginBoxLine />
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-pink-600 text-3xl bg-pink-800 px-4.5 py-3.5 "
                to="/register"
                onClick={menuClose}
              >
                Register
                <FaDoorOpen />
              </NavLink>
            </li>
            <li>
              <button type="button" className={linkClass} onClick={leave}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </IconContext.Provider>
    </nav>
  );
}

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BiSolidCarMechanic } from "react-icons/bi";
import { RiFileInfoFill } from "react-icons/ri";
import { IconContext } from "react-icons/lib";
import { FaBars } from "react-icons/fa";
import { MdPalette } from "react-icons/md";

import logo from "../../assets/bobsLog.png";

// export default function Header({ branding }) { //! outdated prop
export default function Header() {
  // console.log(branding);  // test to see if it is functional
  const [menuOn, setMenuOn] = useState(false);
  const [themeOn, setThemeOn] = useState(false);

  //  lose menus after link pressed
  const menuClose = () => {
    setMenuOn(false);
    setThemeOn(false);
  };

  // Class shared for every every nave to  prevent repetition
  const linkClass = "flex items-center gap-1 hover:text-blue-200";
  const itemClass = "block w-full px-4 py-2 text-left hover:bg-garage-dark";
  return (
    <nav className="mb-4 bg-garage/50 text-white ">
      <IconContext.Provider
        value={{ size: "2.5rem", className: "react-icons " }}
      >
        <div className="flex flex-wrap items-center justify-between px-4 py-7 gap-11">
          <NavLink to="/" className="text-xl font-semibold" onClick={menuClose}>
            <img
              src={logo}
              alt="Bob's Garage logo"
              className="w-full max-w-sm"
            />
          </NavLink>

          {/* Hamburger only on the small screens like tablets and mobile */}
          <button
            className="rounded border border-white/40 px-3 py-1 md:hidden"
            onClick={() => setMenuOn(!menuOn)}
            aria-label="Toggle Navigation Element"
            aria-expanded={menuOn}
          >
            <FaBars />
          </button>

          {/* Links will be hidden on mobile unless menuON set to always shown on md+ */}
          <ul
            className={`${menuOn ? "flex" : "hidden"} w-full flex-col gap-2 pt-3 md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:pt-0`}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "font-bold border-b-2 border-b-red-700" : ""}`
                }
                onClick={menuClose}
              >
                <IoHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "font-bold border-b-2 border-b-red-700" : ""}`
                }
                onClick={menuClose}
              >
                {" "}
                <BiSolidCarMechanic />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "font-bold border-b-2 border-b-red-700" : ""}`
                }
                onClick={menuClose}
              >
                <RiFileInfoFill />
                About
              </NavLink>
            </li>

            {/* Theme options */}
            <li className="relative">
              <button
                className={linkClass}
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
            className={`${menuOn ? "flex" : "hidden"}w-full flex-col gap-2 pt-3 md:flex md:w-auto md:flex-row md:items-center   md:gap-4 md:pt-0`}
          >
            <li>
              <NavLink
                className="hover:text-red-800 text-3xl bg-blue-800 px-10.5 py-4  "
                onClick={menuClose}
                to="/"
              >
                login
              </NavLink>
            </li>
            <li>
              <a
                className="hover:text-red-600 text-3xl bg-blue-800 px-4.5 py-3.5  "
                to="/products"
                onClick={menuClose}
              >
                register
              </a>
            </li>
          </ul>
        </div>
      </IconContext.Provider>
    </nav>
  );
}

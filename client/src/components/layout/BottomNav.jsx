// File -> client/src/components/layout/BottomNav.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Mobile ONly bar stuck to bottom of screen and dependant on role of user
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaThLarge,
  FaUsers,
  FaWrench,
  FaHeart,
  FaCommentDots,
  FaInbox,
} from "react-icons/fa";
import { PiUserSquareFill } from "react-icons/pi";
import { BiSolidInfoSquare } from "react-icons/bi";

import { useAuth } from "../../context/AuthContext";

import { useEnquiries } from "../../context/EnquiriesContext";

export default function BottomNav() {
  const { isAuth, isAdmin, logout } = useAuth();

  const { unreadCount } = useEnquiries();

  // Icon over each link and active page highlighted on the top of nav
  const tabClass = ({ isActive }) =>
    `relative flex flex-1 flex-col items-center gap-1 pt-2.5 pb-2 text-xs no-underline ${isActive ? "font-semibold text-link before:absolute before:top-0 before:h-[3px] before:w-8 before:bg-button " : "font-normal text-muted"}`;

  const tabbed = (to, Icon, label, end = false) => (
    <NavLink to={to} end={end} className={tabClass}>
      <Icon className="text-xl" />
      {label}
    </NavLink>
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line  bg-nav px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgb(0_0_0/0.08)] lg:hidden">
      {isAdmin ? (
        <>
          {tabbed("/admin", FaThLarge, "Dashboard", true)}
          {tabbed("/services", FaWrench, "Services")}
          {tabbed("/admin/users", FaUsers, "Users")}
          {tabbed("/admin/enquiries", FaCommentDots, "Enquiries")}
        </>
      ) : (
        <>
          {isAuth ? (
            <NavLink to="/inbox" className={tabClass}>
              <span className="relative">
                <FaInbox className="text-xl" />

                {unreadCount > 0 && (
                  <span className="absolute -right-2 -top-1 bg-button px-1 text-[10px] leading-4 text-white">
                    {unreadCount}
                  </span>
                )}
              </span>
              Inbox
            </NavLink>
          ) : (
            tabbed("/", FaHome, "Home", true)
          )}
          {tabbed("/services", FaWrench, "Services")}
          {isAuth
            ? tabbed("/saved", FaHeart, "Saved")
            : tabbed("/about", BiSolidInfoSquare, "About")}
          {isAuth && tabbed("/profile", PiUserSquareFill, "Profile")}
        </>
      )}

      {isAuth ? (
        <button
          type="button"
          onClick={logout}
          className={tabClass({ isActive: false })}
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      ) : (
        tabbed("/login", FaSignInAlt, "Login")
      )}
    </nav>
  );
}

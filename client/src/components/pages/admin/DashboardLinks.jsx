// File -> client/src/components/pages/admin/DashboardLinks.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin Sidebar -> Active link gets highlighted
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaHeart } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { LuMailQuestion } from "react-icons/lu";

export default function DashboardLinks() {
  const linkClass = ({ isActive }) =>
    `dashboard-link ${isActive ? "dashboard-link-active" : ""}`;
  return (
    <nav className="gid grid-cols-3 gap-1 sm:grid-cols-6 lg:flex lg:flex-col">
      <NavLink className={linkClass} to="/admin" end>
        Dashboard
        <MdDashboard aria-hidden="true" />
      </NavLink>
      <NavLink className={linkClass} to="users">
        Users
        <FaUsers aria-hidden="true" />
      </NavLink>
      <NavLink className={linkClass} to="users-add">
        Add User
        <HiUserAdd aria-hidden="true" />
      </NavLink>

      <NavLink className={linkClass} to="favourites">
        Interested
        <FaHeart aria-hidden="true" />
      </NavLink>
      <NavLink className={linkClass} to="enquiries">
        Enquiries
        <LuMailQuestion aria-hidden="true" />
      </NavLink>
    </nav>
  );
}

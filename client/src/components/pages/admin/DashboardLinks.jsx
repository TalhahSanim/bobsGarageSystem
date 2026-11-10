// File -> client/src/components/pages/admin/DashboardLinks.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin Sidebar -> Active link gets highlighted
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUpload, FaHeart } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { LuMailQuestion } from "react-icons/lu";

export default function DashboardLinks() {
  const linkClass = ({ isActive }) =>
    `dashboard-link ${isActive ? "dashboard-link-active" : ""}`;
  return (
    <nav className="flex gap-1 overflow-x-auto whitespace-nowrap lg:flex-col">
      <NavLink className={linkClass} to="/admin" end>
        Dashboard
        <MdDashboard />
      </NavLink>
      <NavLink className={linkClass} to="users">
        Users
        <FaUsers />
      </NavLink>
      <NavLink className={linkClass} to="users-add">
        Add User
        <HiUserAdd />
      </NavLink>
      <NavLink className={linkClass} to="images-new">
        Upload Image
        <FaUpload />
      </NavLink>
      <NavLink className={linkClass} to="favourites">
        Interested
        <FaHeart />
      </NavLink>
      <NavLink className={linkClass} to="enquiries">
        Enquiries
        <LuMailQuestion />
      </NavLink>
    </nav>
  );
}

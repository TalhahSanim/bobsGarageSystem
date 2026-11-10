// File -> client/src/components/pages/admin/DashboardLinks.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin Sidebar -> Active link gets highlighted
import { NavLink } from "react-router-dom";

export default function DashboardLinks() {
  const linkClass = ({ isActive }) =>
    `dashboard-link ${isActive ? "dashboard-link-active" : ""}`;
  return (
    <nav className="flex gap-1 overflow-x-auto whitespace-nowrap lg:flex-col">
      <NavLink className={linkClass} to="/admin" end>
        Dashboard
      </NavLink>
      <NavLink className={linkClass} to="users">
        Users
      </NavLink>
      <NavLink className={linkClass} to="users-add">
        Add User
      </NavLink>
      <NavLink className={linkClass} to="images-new">
        Upload Image
      </NavLink>
      <NavLink className={linkClass} to="favourites">
        Interested
      </NavLink>
      <NavLink className={linkClass} to="enquiries">
        Enquiries
      </NavLink>
    </nav>
  );
}

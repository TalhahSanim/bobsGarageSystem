// Adminn sidebar links
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function DashboardLinks() {
  //  Highlink depending on page we are
  const linkClass = ({ isActive }) =>
    `dashboard-link ${isActive ? "bg-black text-white" : ""}`;
  return (
    <Fragment>
      <NavLink className={linkClass} to="users">
        User List
      </NavLink>

      <NavLink className={linkClass} to="users-add">
        Add New User
      </NavLink>

      <NavLink className={linkClass} to="images-new">
        Upload images
      </NavLink>
      <NavLink className={linkClass} to="images-update">
        Change Images on homepage
      </NavLink>
    </Fragment>
  );
}

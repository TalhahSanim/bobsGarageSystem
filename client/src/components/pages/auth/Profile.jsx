// File -> client/components/pages/auth/Profile.jsx
//  The logged in users profile-> Shows their details, preferences and number of favourites

import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { PiUserSquareFill } from "react-icons/pi";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { useFavourites } from "../../../context/FavouritesContext";

// Profile Component which is shown to logged in users
export default function Profile() {
  const { user, isAdmin } = useAuth();
  const {
    theme,
    fontSize,
    sortOrder,
    changeTheme,
    changeFontSize,
    changeSort,
  } = useTheme();
  const { favourites } = useFavourites();
  return (
    <main className="my-6">
      <title>Personal Profile - Bob's Garage</title>
      <h1 className="mb-6 text-3xl">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* About Me */}
        <section className="panel">
          <div className="panel-header">About Me</div>
          <div className="panel-body flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt=""
                className="size-60 shrink-0 object-cover ring-2 ring-line"
              />
            ) : (
              <PiUserSquareFill
                className="size-20 text-muted"
                aria-hidden="true"
              />
            )}
            <div>
              <p className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-muted">{user.email}</p>
              <span
                className={`badge mt-2 ${isAdmin ? "bg-primary text-on-primary" : "bg-primary-light text-link"}`}
              >
                {isAdmin ? "Admin" : "Customer"}
              </span>
            </div>
          </div>
        </section>

        {/* My Preference which is saved to the database */}
        <section className="panel">
          <div className="panel-header">My Preferences</div>
          <div className="panel-body">
            <div className="mb-4">
              <label className="form-label" htmlFor="theme">
                Theme
              </label>
              <select
                id="theme"
                className="form-input bg-surface"
                value={theme}
                onChange={(e) => changeTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="fontSize">
                Font Size
              </label>
              <select
                id="fontSize"
                className="form-input bg-surface"
                value={fontSize}
                onChange={(e) => changeFontSize(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="sortOrder">
                Default Sort
              </label>
              <select
                id="sortOrder"
                className="form-input bg-surface"
                value={sortOrder}
                onChange={(e) => changeSort(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="fee-ASC">Fee: Low to High</option>
                <option value="fee-ASC">Fee: High to Low</option>
                <option value="name-ASC">Name: A-Z</option>
              </select>
            </div>
            <p className="text-sm text-muted">
              Automatically saved into your account.
            </p>
          </div>
        </section>
      </div>

      {/* Favourites Overview */}
      <Link
        to="/saved"
        className="mt-6 flex items-center gap-3 border border-line bg-surface p-4 shadow-sm hover:shadow-md"
      >
        <FaHeart className="text-accent" />
        You have {favourites.length} favourite{" "}
        {favourites.length === 1 ? "service" : "services"}
      </Link>
    </main>
  );
}

// File -> client/components/pages/auth/Profile.jsx
//  The logged in users profile-> Shows their details, preferences and number of favourites

import { Link } from "react-router-dom";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { useFavourites } from "../../../context/FavouritesContext";

// Profile Component which is shown to logged in users
export default function Profile() {
  const { user, isAdmin } = useAuth();
  const { theme, fontSize, changeTheme, changeFontSize } = useTheme();
  const { favourites } = useFavourites;
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
              <img src={user.image} alt="" className="size-20 object-cover" />
            ) : (
              <FaUserCircle className="size-20 text-muted" aria-hidden="true" />
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
              <option value="light"></option>
              <option value="dark"></option>
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
          <p className="text-sm text-muted">
            Automatically saved into your account.
          </p>
        </section>
      </div>

      {/* Favourites Overview */}
      <Link
        to="/favorites"
        className="mt-6 flex items-center gap-3 border border-line bg-surface p-4 shadow-sm hover:shadow-md"
      >
        <FaHeart className="text-accent" />
        You have {favourites.length} favourite{" "}
        {favourites.length === 1 ? "service" : "services"}
      </Link>
    </main>
  );
}

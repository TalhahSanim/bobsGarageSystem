// Theme Button -> switches html data theme light to dark
// used in header and admin dash

import { FaMoon, FaSun } from "react-icons/fa";

export default function ToggleTheme({ className = "" }) {
  // Turn on on data theme on html and it will be applied
  const themeToggle = () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  };
  return (
    <button
      type="button"
      className={`btn btn-ghost  btn-square ${className}`}
      onClick={themeToggle}
      aria-label="toggle dark mode"
    >
      <FaMoon className="size-5 dark:hidden" />
      <FaSun className="hidden size-5 dark:block" />
    </button>
  );
}

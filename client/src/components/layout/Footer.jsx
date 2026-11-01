// Site footer incluses brand links hours and contact and copyright
import { Link } from "react-router-dom";
import logo from "../../assets/logo-light.png";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className=" bg-neutral max-w-8xl p-10 sm:footer-horizontal">
      {/* Brand */}
      <aside>
        <img src={logo} alt="Bob's Garage" className="h-14 w-auto" />
        <p className="max-w-xs text-neutral-content/70">
          Reliable Service provider and repairs custom for one stop stop
        </p>
      </aside>

      {/* page links */}
      <nav className="gap-4">
        <h6 className="footer-title">Explore</h6>
        <Link to="/services" className="link link-hover">
          Services
        </Link>
        <Link to="/about" className="link link-hover">
          About|Us
        </Link>
        <Link to="/register" className="link link-hover">
          Create an Account
        </Link>

        {/* Copyright */}

        <div className="border-t border-neutral-content/10 py-4 text-center text-sm text-neutral-content/60">
          © {year} Bob's Garage. All rights reserved.
        </div>
      </nav>
    </footer>
  );
}

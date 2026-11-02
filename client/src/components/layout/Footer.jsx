// Site Footer -> Logo, page links, account links,social links and copyright
import { Link, useLocation } from "react-router-dom";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareInstagram, FaLinkedin } from "react-icons/fa6";

import logo from "../../assets/logo-light.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const inAdmin = pathname.startsWith("/admin");
  return (
    <footer
      className={`bg-linear-to-r from-footer from-70% to-footer-end font-normal text-on-footer ${inAdmin ? "lg:hidden" : ""}`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <img src={logo} alt="Bob's Garage" className="h-16 w-auto" />
          <p className="mt-2 text-on-footer/80">
            Speedy Service With Top Notch Care
          </p>
        </div>
        {/* Page Links */}
        <nav className="flex flex-col gap-2">
          <h2 className="font-sans text-base font-semibold">Our Garage</h2>
          <Link to="/" className="text-on-footer/80 hover:text-white">
            Home
          </Link>
          <Link to="/services" className="text-on-footer/80 hover:text-white">
            Services
          </Link>
          <Link to="/about" className="text-on-footer/80 hover:text-white">
            About
          </Link>
        </nav>
        {/* Account Links */}
        <nav className="flex flex-col gap-2">
          <h2 className="font-sans text-base font-semibold">Our Socials</h2>
          <a
            href="https://facebook.com"
            className="text-on-footer/80 hover:text-white"
          >
            <IoLogoFacebook />
            Facebook
          </a>
          <a
            href="https://instagram.com"
            className="text-on-footer/80 hover:text-white"
          >
            <FaSquareInstagram /> Instagram
          </a>
          <a
            href="https://linkedin.com"
            className="text-on-footer/80 hover:text-white"
          >
            <FaLinkedin />
            Linkedin
          </a>
        </nav>
      </div>
      {/* Copyright */}
      <div className="mx-auto max-w-6xl border-t border-white/10  px-4 text-sm font-normal text-on-footer/70">
        All Rights Reserved. © Bob's Garage {year}
      </div>
    </footer>
  );
}

// File -> client/src/components/layout/Footer.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Site Footer -> Logo, page links, account links,social links and copyright
import { Link, useLocation } from "react-router-dom";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareInstagram, FaLinkedin } from "react-icons/fa6";

import { MdGarage, MdAccountBox } from "react-icons/md";
import { FaMapMarked } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";

import lightLogo from "../../assets/logo-light.png";
import darkLogo from "../../assets/logo-dark.png";
export default function Footer({ embedded }) {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();

  const hiddenOnDesktop = pathname.startsWith("/admin") && !embedded;
  const compact = embedded;
  const grid = compact
    ? "grid grid-cols-2 gap-10 px-4 py-14 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 lg:px-10 lg:py-7 lg:text-sm"
    : "mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-14 md:grid-cols-3";

  const heading = `font-sans font-semibold ${compact ? "text-base lg:text-sm" : "text-base"}`;
  const column = `flex flex-col gap-2 ${compact ? "lg:gap-1" : ""}`;

  return (
    <footer
      className={`bg-linear-to-r from-footer from-70% to-footer-end font-normal text-on-footer ${hiddenOnDesktop ? "lg:hidden" : ""} `}
    >
      {/* Contact Form */}
      <div className={grid}>
        {/* Brand */}
        <div
          className={compact ? "col-span-full lg:col-span-1" : "col-span-full"}
        >
          <img
            src={lightLogo}
            alt="Bob's Garage"
            className={`w-auto dark:hidden ${compact ? "h-16 lg:h-10" : "h-16"}`}
          />
          <img
            src={darkLogo}
            alt="Bob's Garage"
            className={`hidden w-auto dark:block ${compact ? "h-16 lg:h-10" : "h-16"}`}
          />
          <p className="mt-2 text-on-footer/80">
            Speedy Service With Top Notch Care
          </p>
        </div>
        {/* Page Links */}
        <nav className={column}>
          <h2 className={heading}>Our Garage</h2>
          <MdGarage />
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
        {/* Accounts */}
        <nav className={column}>
          <h2 className={heading}>Accounts</h2>
          <MdAccountBox />
          <Link to="/login" className="text-on-footer/80 hover:text-white">
            Login
          </Link>
          <Link to="/register" className="text-on-footer/80 hover:text-white">
            Register
          </Link>
        </nav>
        {/* contact us */}
        <div className={column}>
          <h2 className={heading}>Contact Us</h2>

          <FaMapMarked />
          <address className={`${column} not-italic text-on-footer/80`}>
            <span className="hover:text-white">
              52 Box Street, Melbourne, 3000
            </span>
            <a href="tel:6139843929" className="hover:text-white">
              (03) 39843929
            </a>
            <a
              href="mailto:service@bobsgarage.com"
              className="hover:text-white"
            >
              service@bobsgarage.com
            </a>
          </address>
        </div>
        {/* Opening Hours */}
        <div className={`${column} text-on-footer/80`}>
          <h2 className={`${heading} text-on-footer`}>Opening Hours</h2>
          <IoTime />
          <p>Monday to Friday 7:00am - 7:00pm</p>
          <p>Saturday & Sunday 7:00am - 5:00pm</p>
        </div>
        {/* Social Links */}
        <nav className={column}>
          <h2 className={heading}>Our Socials</h2>
          <IoMdChatboxes />
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-footer/80 hover:text-white inline-flex items-center gap-2"
          >
            <IoLogoFacebook aria-hidden="true" />
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-footer/80 hover:text-white inline-flex items-center gap-2"
          >
            <FaSquareInstagram aria-hidden="true" /> Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-footer/80 hover:text-white inline-flex items-center gap-2"
          >
            <FaLinkedin aria-hidden="true" />
            Linkedin
          </a>
        </nav>
      </div>{" "}
      {/* Copyright */}
      <div
        className={`border-t border-white/10 font-normal text-on-footer/70 ${compact ? "px-4 py-4 text-sm lg:px-10 lg:py-3 lg:text-xs" : "mx-auto max-w-6xl px-4 py-4 text-sm"} `}
      >
        All Rights Reserved. © Bob's Garage {year}
      </div>
    </footer>
  );
}

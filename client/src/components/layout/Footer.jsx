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
      {/* Contact Form */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <img src={logo} alt="Bob's Garage" className="h-16 w-auto" />
          <p className="mt-2 text-on-footer/80">
            Speedy Service With Top Notch Care
          </p>
        </div>{" "}
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
        {/* Accs */}
        <nav className="flex flex-col gap-2">
          <h2 className="font-sans text-base font-semibold">Accounts</h2>
          <Link to="/login" className="text-on-footer/80 hover:text-white">
            Login
          </Link>
          <Link to="/register" className="text-on-footer/80 hover:text-white">
            Register
          </Link>
        </nav>{" "}
        <div className="flex flex-col gap-2">
          <h2 className="font-sans text-base font-semibold">Contact Us</h2>
          <address className="flex flex-col gap-2 not-italic text-on-footer/80">
            <span className="hover:text-white">
              52 Box Street, Melbourne, 3000
            </span>
            <a href="tel:61398439293" className="hover:text-white">
              (03) 398439293
            </a>
            <a
              href="mailto:service@bobsgarage.com"
              className="hover:text-white"
            >
              {" "}
              service@bobsgarage.com (03) 398439293
            </a>
          </address>
        </div>
        {/* Opening Hours */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Opening Hours</h2>
          <p>Monday to Friday 7:00am - 7:00pm</p>
          <p>Saturday & Sunday 7:00am 5:00pm</p>
        </div>
        {/* Account Links */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Accounts</h2>
        </div>
        {/* Social Links */}
        <nav className="flex flex-col gap-2">
          <h2 className="font-sans text-base font-semibold">Our Socials</h2>
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
      <div className="mx-auto max-w-6xl border-t border-white/10  px-4 text-sm font-normal text-on-footer/70">
        All Rights Reserved. © Bob's Garage {year}
      </div>
    </footer>
  );
}

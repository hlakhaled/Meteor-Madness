import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // ✅ use NavLink instead of Link
import { assets } from "../assets/assets";

const navLinks = [
  { name: "Defend Earth", to: "/defend-earth" },
  { name: "Asteroid Simulation", to: "/asteroid-simulation" },
  { name: "Fun Facts", to: "/fun-facts" },
  { name: "About Challenge", to: "/about-challenge" },
];

const textShadowStyle = {
  textShadow: "0px 5px 9px rgb(140 88 243 / 0.70)",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  
  return (
    <header className="w-full py-5 px-10 flex items-center justify-between bg-black text-white border-b border-purple-900/20">
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center gap-3"

      >
        <img
          src={assets.rockImage}
          alt="Meteor"
          className="w-12 h-12 object-contain"
        />
        <span className="font-bold text-xl tracking-wide">
          Meteor Madness
        </span>
      </NavLink>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center">
        <ul className="flex gap-10">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-base font-medium inline-block transform transition-all duration-300 ease-in-out hover:text-purple-400 ${
                    isActive
                      ? "underline underline-offset-[6px] decoration-2 decoration-[#8b58f2]"
                      : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl focus:outline-none"
      >
        {open ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {open && (
        <nav className="absolute top-20 left-0 w-full bg-black px-6 pb-4 md:hidden border-b border-purple-900/20 z-50">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-base font-medium block transform transition-all duration-300 ease-in-out hover:text-purple-400 hover:translate-x-1 ${
                      isActive
                        ? "underline underline-offset-4 decoration-[#8b58f2]"
                        : ""
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
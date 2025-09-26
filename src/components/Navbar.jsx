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
    <header className="w-full py-4 px-6 flex items-center justify-between md:justify-around bg-black text-white">
      {/* Logo */}
      <NavLink
        to="/"
        style={textShadowStyle}
        className="font-jaini text-2xl sm:text-3xl flex items-center"
      >
        <img
          src={assets.rockImage}
          alt="Rocket"
          className="w-10 h-10 sm:w-14 sm:h-14 mr-2"
        />
        Meteor Madness
      </NavLink>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-12">
        <ul className="flex gap-10">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `font-jaini text-lg lg:text-xl inline-block transform transition-transform duration-300 ease-in-out lg:hover:-translate-y-0.5 hover:[text-shadow:_0px_5px_9px_rgb(140_88_243_/_0.70)] ${
                    isActive
                      ? "underline underline-offset-4 decoration-[#8b58f2]"
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
        <nav className="absolute top-16 left-0 w-full bg-black px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-jaini text-lg block transform transition-transform duration-300 ease-in-out hover:translate-x-1 hover:[text-shadow:_0px_5px_9px_rgb(140_88_243_/_0.70)] ${
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

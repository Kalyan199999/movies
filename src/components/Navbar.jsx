import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = (path) =>
    `hover:text-yellow-300 ${
      pathname === path ? "text-yellow-400 font-semibold" : ""
    }`;

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md px-4 py-3 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-400">
          <Link to="/">🎬 Movie Explorer</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-white text-2xl">
            {isOpen ? <i className="bx bx-x" /> : <i className="bx bx-menu" />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/popular" className={linkClass("/popular")}>Popular</Link>
          <Link to="/trending" className={linkClass("/trending")}>Trending</Link>
          <Link to="/upcoming" className={linkClass("/upcoming")}>Upcoming</Link>
          <Link to="/genres" className={linkClass("/genres")}>Genres</Link>
          <Link to="/search" className={`hover:text-blue-300 text-2xl ${pathname === "/search" ? "text-blue-400" : ""}`}>
            <i className="bx bxs-search-alt-2" />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3 md:hidden">
          <Link to="/popular" onClick={toggleMenu} className={linkClass("/popular")}>Popular</Link>
          <Link to="/trending" onClick={toggleMenu} className={linkClass("/trending")}>Trending</Link>
          <Link to="/upcoming" onClick={toggleMenu} className={linkClass("/upcoming")}>Upcoming</Link>
          <Link to="/genres" onClick={toggleMenu} className={linkClass("/genres")}>Genres</Link>
          <Link to="/search" onClick={toggleMenu} className={`hover:text-blue-300 text-xl ${pathname === "/search" ? "text-blue-400" : ""}`}>
            <i className="bx bxs-search-alt-2" />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

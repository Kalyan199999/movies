import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md px-4 py-3 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-400">
          <Link to={"/"}>🎬 Movie Explorer</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-white text-2xl">
            {isOpen ? (
              <i className="bx bx-x" />
            ) : (
              <i className="bx bx-menu" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/popular" className="hover:text-yellow-300">Popular</Link>
          <Link to="/trending" className="hover:text-yellow-300">Trending</Link>
          <Link to="/upcoming" className="hover:text-yellow-300">Upcoming</Link>
          <Link to="/genres" className="hover:text-yellow-300">Genres</Link>
          <Link to="/search" className="hover:text-blue-200 text-2xl">
            <i className="bx bxs-search-alt-2" />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3 md:hidden">
          <Link to="/popular" className="hover:text-yellow-300" onClick={toggleMenu}>Popular</Link>
          <Link to="/trending" className="hover:text-yellow-300" onClick={toggleMenu}>Trending</Link>
          <Link to="/upcoming" className="hover:text-yellow-300" onClick={toggleMenu}>Upcoming</Link>
          <Link to="/genres" className="hover:text-yellow-300" onClick={toggleMenu}>Genres</Link>
          <Link to="/search" className="hover:text-blue-200 text-xl" onClick={toggleMenu}>
            Search <i className="bx bxs-search-alt-2" />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

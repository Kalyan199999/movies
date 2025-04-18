import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="w-full bg-gray-900 text-white shadow-md px-4 py-3 flex flex-col md:flex-row items-center justify-between fixed top-0 left-0 z-50">
      
        <div className="text-2xl font-bold text-yellow-400">
          <Link to={"/"}>
            🎬 Movie Explorer
          </Link>
        </div>

      <div className="flex flex-wrap gap-4 my-3 md:my-0">

        <Link to="/popular" className="hover:text-yellow-300">Popular</Link>
        <Link to="/trending" className="hover:text-yellow-300">Trending</Link>
        <Link to="upcoming" className="hover:text-yellow-300">Upcoming</Link>
        <Link to="/genres" className="hover:text-yellow-300">Genres</Link>

      </div>

      <div>
        <Link to="/search" className="hover:text-blue-100 text-3xl"> <i class='bx bxs-search-alt-2'></i></Link>
      </div>
      
    </nav>
  );
}

export default Navbar;

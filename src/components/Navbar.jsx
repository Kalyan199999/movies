import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (

    <nav className="w-full bg-gray-900 text-white shadow-md px-4 py-3 flex flex-col md:flex-row items-center justify-between fixed top-0 left-0 z-50">
     
      
      <Link to={"/"}>
        <div className="text-2xl font-bold text-yellow-400">
          🎬 Movie Explorer
        </div>
      </Link>

      {/* Genre Links */}
      <div className="flex flex-wrap gap-4 my-3 md:my-0">

        <Link to="/popular" className="hover:text-yellow-300">Popular</Link>
        <Link to="/trending" className="hover:text-yellow-300">Trending</Link>
        <Link to="upcoming" className="hover:text-yellow-300">Upcoming</Link>
        <Link to="/genres" className="hover:text-yellow-300">Genres</Link>

      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex mt-3 md:mt-0 items-center gap-2"
      >
        <input
          type="text"
          placeholder="Search movies..."
          className="px-3 py-1 rounded text-black outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
        >
          Search
        </button>

      </form>
      
    </nav>
  );
}

export default Navbar;

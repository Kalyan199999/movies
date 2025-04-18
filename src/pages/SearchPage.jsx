import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

  const [query, setQuery] = useState('');

  const [results, setResults] = useState([]);

  const [typingTimeout, setTypingTimeout] = useState(0);

  const navigate = useNavigate();

  const searchMovies = async (searchText) => {
    try {
      if (searchText.trim() === '') return setResults([]);

      const res = await axios.get(`${BASE_URL}/search/movie`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: {
          query: searchText,
          language: 'en-US',
        },
      });
      setResults(res.data.results);
    } 
    catch (err) {
      console.error('Error searching movies:', err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(setTimeout(() => {
      searchMovies(value);
    }, 500)); // debounce search
  };

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-100 p-6">
      
      <div className="max-w-3xl mx-auto text-center mb-10">
       
        <h2 className="text-4xl font-bold text-gray-800 mb-4">🔍 Search Movies</h2>
        
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Type a movie name..."
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg shadow-md"
        />

      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {
        results.length > 0 ? 
        (
          results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer overflow-hidden"
            >
              <img
                src={
                  movie.poster_path
                    ? `${img_url}${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title}
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{movie.title}</h3>
                <p className="text-sm text-gray-500 mt-1">⭐ {movie.vote_average.toFixed(1)} | 📅 {movie.release_date}</p>
              </div>
            </div>

          ))
        ) : query ? 
        ( <p className="col-span-full text-center text-gray-600 text-lg mt-12">No movies found for "{query}"</p>) : null
        }

      </div>

    </div>
  );
};

export default SearchPage;

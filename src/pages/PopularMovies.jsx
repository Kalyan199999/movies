import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

const PopularMovies = () => {
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          language: 'en-US',
          page: 1,
        },
      });
      setPopular(response.data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="px-6 py-12 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 mt-12 min-h-screen">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 drop-shadow">🔥 Popular Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {popular.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={`${img_url}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto max-h-96 object-cover"
              loading="lazy"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 truncate mb-1">{movie.title}</h3>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="bg-yellow-400 text-white px-2 py-1 rounded-full font-semibold text-xs shadow">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-500">📅 {movie.release_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;

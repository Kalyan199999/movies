import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/trending/movie/day`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          language: 'en-US',
        },
      });
      setTrending(res.data.results);
    } catch (err) {
      console.error('Failed to fetch trending movies:', err);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 py-16 px-6 mt-12">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-14 drop-shadow-lg">
        🌟 Trending Movies Today
      </h2>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {trending.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-[1.03]"
          >
            <div className="overflow-hidden">
              <img
                src={`${img_url}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                className="w-full h-96 object-cover group-hover:brightness-90 transition"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 truncate mb-1">{movie.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-xs font-medium">📅 {movie.release_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

const UpcomingMovies = () => {
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  const fetchUpcomingMovies = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          language: 'en-US',
          page: 1,
        },
      });
      setUpcoming(res.data.results);
    } catch (err) {
      console.error('Error fetching upcoming movies:', err);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-sky-100 via-blue-100 to-indigo-100 mt-12">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-14 drop-shadow-md">
        🎥 Upcoming Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {upcoming.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition transform duration-300"
          >
            <img
              src={`${img_url}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-96 object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 truncate mb-2">{movie.title}</h3>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  🎯 {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-xs">📅 {movie.release_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;

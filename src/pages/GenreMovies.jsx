import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';

const GenreMovies = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const navigate = useNavigate();

  const fetchGenreMovies = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/discover/movie`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          with_genres: genreId,
          language: 'en-US',
          sort_by: 'popularity.desc',
        },
      });
      setMovies(res.data.results);
    } catch (err) {
      console.error('Failed to fetch genre movies:', err);
    }
  };

  const fetchGenreName = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: { language: 'en-US' },
      });
      const genre = res.data.genres.find((g) => g.id === parseInt(genreId));
      setGenreName(genre?.name || 'Genre');
    } catch (err) {
      console.error('Error fetching genre name:', err);
    }
  };

  useEffect(() => {
    fetchGenreMovies();
    fetchGenreName();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [genreId]);

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-purple-50 via-pink-100 to-red-100 mt-12">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide drop-shadow-lg">
        🎬 {genreName} Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            <div className="relative">
              <img
                src={`${img_url}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{movie.title}</h3>
              <p className="text-sm text-gray-500 mt-1">📅 {movie.release_date}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                  Popularity: {movie.popularity.toFixed(0)}
                </span>
                {movie.adult && (
                  <span className="bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                    🔞 Adult
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreMovies;

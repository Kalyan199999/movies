import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovieDetails = async () => {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        language: 'en-US'
      }
    });
    setMovie(res.data);
    console.log(res.data);
    
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="text-center text-xl mt-20 animate-pulse">Loading movie details...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 flex justify-center items-center mt-12">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row gap-8 p-6 md:p-10">
        
        {/* Movie Poster */}
        <img
          src={`${img_url}${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 object-cover rounded-2xl shadow-md"
        />

        {/* Movie Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{movie.title}</h1>
          <p className="italic text-blue-600 text-lg">{movie.tagline}</p>
          <p className="text-gray-700 text-base leading-relaxed">{movie.overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm md:text-base">
            <p><span className="font-semibold text-gray-600">🎬 Genres:</span> {movie.genres.map(g => g.name).join(', ')}</p>
            <p><span className="font-semibold text-gray-600">⭐ Rating:</span> {movie.vote_average}</p>
            <p><span className="font-semibold text-gray-600">📅 Release Date:</span> {movie.release_date}</p>
            <p><span className="font-semibold text-gray-600">⏱️ Runtime:</span> {movie.runtime} mins</p>
          </div>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-700 transition duration-300"
            >
              Visit Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube'; // For embedding trailers

const UpcomingMovies = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [trailer, setTrailer] = useState(null); // For storing the trailer ID
  const [genres, setGenres] = useState([]);
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

  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          language: 'en-US',
        },
      });
      setGenres(res.data.genres);
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  const fetchTrailer = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          language: 'en-US',
        },
      });
      // Find the trailer video
      const trailerVideo = res.data.results.find((video) => video.type === 'Trailer');
      if (trailerVideo) {
        setTrailer(trailerVideo.key); // Set trailer video key
      } else {
        setTrailer(null); // No trailer available
      }
    } catch (err) {
      console.error('Error fetching trailer:', err);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
    fetchGenres();
  }, []);


  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-sky-100 via-blue-100 to-indigo-100 mt-12">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-14 drop-shadow-md">
        🎥 Upcoming Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {
         upcoming.map((movie) => (
          <div
            key={movie.id}
            onClick={() => {
              navigate(`/movie/${movie.id}`);
              fetchTrailer(movie.id); // Fetch trailer when a movie is clicked
            }}
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
              <div className="flex flex-wrap gap-2 mb-3">

                {
                movie.genre_ids.slice(0, 3).map((genreId) => (
                  <span
                    key={genreId}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow"
                  >
                    {genres.find((genre) => genre.id === genreId)?.name}
                  </span>
                ))
                }

              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-xs">📅 {movie.release_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trailer Modal */}
      {/* {
      trailer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            
          <div className="bg-white p-4 rounded-lg w-11/12 md:w-8/12 lg:w-6/12">
            <div className="flex justify-end">
              <button
                onClick={() => setTrailer(null)}
                className="text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Trailer</h3>
            <YouTube videoId={trailer} opts={{ height: '390', width: '640' }} />
          </div>
        </div>
      )} */}

    </div>
  );
};

export default UpcomingMovies;

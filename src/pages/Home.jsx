import React, { useState, useEffect } from 'react';
import { API_KEY, BASE_URL, img_url } from '../api/tmdb';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setAllMovies(response.data.results);
      // console.log(response.data.results);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchData()

    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  }, [page]);

  const previous = () => {
    if (page > 1) setPage(page - 1);
  };

  const next = () => {
    if (page < 10) setPage(page + 1);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen mt-12 flex flex-col items-center">
      
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 shadow-sm">🎬 Popular Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl px-4">
        {
        allMovies &&
          allMovies.map((movie) =>
            movie.poster_path ? (
              <div
                key={movie.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)} 
              >
                <img
                  src={`${img_url}${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-auto max-h-96 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{movie.original_title}</h2>
                  <h3 className="text-lg font-semibold text-gray-800">
                        Rating:{' '}
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold ${
                            movie.vote_average >= 7
                              ? 'bg-green-500'
                              : movie.vote_average >= 5
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                        >
                          {movie.vote_average.toFixed(1)}
                        </span>
                    </h3>

                </div>
                

              </div>
            ) : null
          )
          }
      </div>

      {/* Pagination */}
      {
        allMovies && <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={previous}
          disabled={page === 1}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-lg font-semibold text-gray-700">{`Page-${page}`}</span>
        <button
          onClick={next}
          disabled={page === 10}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>

      </div>
      }
    </div>
  );
}

export default Home;

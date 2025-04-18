import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

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
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
   
   <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 mt-12">
      
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-14">🎭 Movie Genres</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {
            genres.map((genre) => (
              <div
                key={genre.id}
                onClick={() => navigate(`/genre/${genre.id}`)} // You can create this route later
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer text-center p-6"
              >
                <h3 className="text-2xl font-bold text-gray-700">{genre.name}</h3>
              </div>
            ))
        }

      </div>

    </div>
    
  );
};

export default Genres;

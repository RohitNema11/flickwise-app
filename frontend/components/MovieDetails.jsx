'use client';

import { useEffect, useState } from 'react';
import { getMovieDetails } from '@/services/api';

function MovieDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(movieId);
      setMovie(data);
      setLoading(false);
    };

    if (movieId) fetchDetails();
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative bg-gray-900 text-white rounded-xl shadow-2xl p-6 max-w-5xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 cursor-pointer"
        >
          &times;
        </button>

        {loading ? (
          <div className="text-center text-gray-300 py-10">Loading movie details...</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <p className="text-sm text-gray-400 mb-1">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p className="text-sm text-gray-400 mb-3">
                <strong>Rating:</strong> {movie.vote_average} / 10
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">{movie.overview}</p>
              {movie.genres && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-800 px-3 py-1 text-sm rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;

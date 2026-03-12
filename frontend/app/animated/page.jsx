'use client';

import { useState, useEffect } from "react";
import { getAnimatedMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import MovieDetails from "@/components/MovieDetails";
import { useWishlist } from "@/context/WishlistContext";

export default function AnimatedPage() {
  const { wishlist, setWishlist } = useWishlist();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const loadAnimatedMovies = async () => {
      try {
        const animatedMovies = await getAnimatedMovies();
        setMovies(animatedMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadAnimatedMovies();
  }, []);

  const handleCardClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-8 text-center">Animated</h1>
      {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}

      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {(movies || []).map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleCardClick(movie.id)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <MovieCard
                movie={movie}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            </div>
          ))}
        </div>
      )}

      {selectedMovieId && (
        <MovieDetails
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
}

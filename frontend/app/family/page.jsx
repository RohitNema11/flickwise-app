'use client';

import { useEffect, useState } from "react";
import { getFamilyMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import MovieDetails from "@/components/MovieDetails";
import { useWishlist } from "@/context/WishlistContext";

export default function FamilyPage() {
  const { wishlist, setWishlist } = useWishlist();
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getFamilyMovies();
        setMovies(data);
      } catch {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Family</h1>
      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {(movies || []).map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovieId(movie.id)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <MovieCard movie={movie} wishlist={wishlist} setWishlist={setWishlist} />
            </div>
          ))}
        </div>
      )}

      {selectedMovieId && (
        <MovieDetails movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}
    </div>
  );
}

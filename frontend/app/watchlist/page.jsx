'use client';

import { useState, useEffect } from 'react';
import { useWishlist } from "@/context/WishlistContext";
import MovieCard from "@/components/movieCard";
import MovieDetails from '@/components/MovieDetails'; 


export default function WatchlistPage() {
  const { wishlist, setWishlist } = useWishlist();
  const [selectedMovieId, setSelectedMovieId] = useState(null);

const handleCardClick = (movieId) => {
    setSelectedMovieId(movieId);
  };  
  
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Your Watchlist is Empty</h2>
          <p className="text-lg text-gray-400">
            Start adding movies to your watchlist and they’ll show up here!
          </p>
        </div>
      ) : (
        <>
          <h2 className="sticky top-[60px] z-40 bg-black text-3xl font-bold mb-6 py-4 text-center">
            Your Watchlist
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishlist.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleCardClick(movie.id)}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
              <MovieCard
                key={movie.id}
                movie={movie} 
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
              </div>
            ))}
          </div>

          {selectedMovieId && (
            <MovieDetails
              movieId={selectedMovieId}
              onClose={() => setSelectedMovieId(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

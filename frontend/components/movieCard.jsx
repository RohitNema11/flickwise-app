'use client';

import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

function MovieCard({ movie, wishlist = [], setWishlist = () => {} }) {
  const isFavourite = wishlist?.some((m) => m.id === movie.id);

  function onFavouriteClick(e) {
    e.stopPropagation();
    if (isFavourite) {
      setWishlist(wishlist.filter((m) => m.id !== movie.id));
    } else {
      setWishlist([...wishlist, movie]);
    }
  }

  const imagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/fallback.jpg';

  return (
    <div className="movie-card bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col justify-between h-[450px]">
      <div className="relative h-[350px]">
        <Image
          src={imagePath}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 100vw, 250px"
          className="object-cover rounded-t-lg"
          priority
        />
        <button
          onClick={(e) => onFavouriteClick(e)}
          title={isFavourite ? 'Remove from Watchlist' : 'Add to Watchlist'}
          className={`absolute top-2 right-2 p-2 text-2xl cursor-pointer transition-colors duration-200 ${
            isFavourite ? 'text-pink-500' : 'text-white hover:text-pink-400'
          }`}
        >
          {isFavourite ? <FaHeart /> : <FiHeart />}
        </button>
      </div>
      <div className="p-2 text-center">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {movie.release_date?.split('-')[0]}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;

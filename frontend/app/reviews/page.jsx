'use client';

import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/contact`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Visitor Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-400">No reviews submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-md shadow transition-transform duration-200 hover:scale-101">
              <p className="text-lg font-semibold">{review.name}</p>
              <p className="text-white">{review.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

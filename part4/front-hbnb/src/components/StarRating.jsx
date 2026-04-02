import { useState, useEffect } from 'react';

export default function StarRating({ onRate, initialRating = 0 }) {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRate = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`w-10 h-10 rounded-full text-sm font-bold transition ${
            star <= (hovered || rating)
              ? 'bg-amber-500 text-white'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          {star}
        </button>
      ))}
    </div>
  );
}

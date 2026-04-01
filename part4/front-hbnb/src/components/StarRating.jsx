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
          className={`text-3xl transition ${
            star <= (hovered || rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

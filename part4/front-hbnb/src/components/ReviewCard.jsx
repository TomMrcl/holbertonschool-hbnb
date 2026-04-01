export default function ReviewCard({ review, onDelete }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{review.user_id?.substring(0, 8) || 'User'}</span>
          <span className="text-yellow-500">★ {review.rating}</span>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-gray-700 text-sm">{review.text}</p>
    </div>
  );
}

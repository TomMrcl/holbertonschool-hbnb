export default function ReviewCard({ review, onDelete }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold dark:text-gray-100">{review.user_id?.substring(0, 8) || 'User'}</span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold">Rating: {review.rating}/5</span>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{review.text}</p>
    </div>
  );
}

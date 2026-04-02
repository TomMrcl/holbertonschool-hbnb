import { useNavigate } from 'react-router-dom';

export default function PlaceCard({ place }) {
  const navigate = useNavigate();

  // Generate consistent image URL based on place title
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % 100;
  };

  const imageId = hashString(place.title);
  const imageUrl = `https://picsum.photos/500/400?random=${imageId}`;

  return (
    <div
      onClick={() => navigate(`/place/${place.id}`)}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700"
    >
      <div className="h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={place.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg line-clamp-2 text-gray-900 dark:text-gray-100 mb-2">{place.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {place.description}
        </p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-2xl font-bold text-primary dark:text-violet-400">${place.price}</span>
          <span className="text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1.5 rounded-full">Rating: 4.8</span>
        </div>
      </div>
    </div>
  );
}

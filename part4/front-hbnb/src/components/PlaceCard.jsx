import { useNavigate } from 'react-router-dom';

export default function PlaceCard({ place }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/place/${place.id}`)}
      className="card cursor-pointer"
    >
      <div className="h-48 bg-gradient-to-br from-primary to-red-400"></div>
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-2">{place.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 my-2">
          {place.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-primary">${place.price}/night</span>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded">★ 4.8</span>
        </div>
      </div>
    </div>
  );
}

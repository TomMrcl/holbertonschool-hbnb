import { useState, useEffect } from 'react';
import PlaceCard from '../components/PlaceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPlaces } from '../services/places';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getPlaces();
        setPlaces(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching places:', error);
        setPlaces([]);
      }
      setLoading(false);
    };

    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter((place) => {
    const search = searchTerm.toLowerCase();
    return (
      place.title.toLowerCase().includes(search) ||
      place.description.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Available Places</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search places by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        {/* Results count */}
        <div className="text-gray-600 mb-6">
          Showing {filteredPlaces.length} of {places.length} places
        </div>

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredPlaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No places found matching your search</p>
          </div>
        ) : (
          /* Grid of Places */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

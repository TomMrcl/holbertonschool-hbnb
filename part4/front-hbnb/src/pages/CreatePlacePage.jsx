import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlace } from '../services/places';
import { listAmenities } from '../services/amenities';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastContainer';
import MapPicker from '../components/MapPicker';

export default function CreatePlacePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    latitude: 48.8566,
    longitude: 2.3522,
    amenity_ids: [],
  });
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingAmenities, setFetchingAmenities] = useState(true);
  const navigate = useNavigate();
  const { toasts, addToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const data = await listAmenities();
        setAmenities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching amenities:', error);
        addToast('Error loading amenities', 'error');
      } finally {
        setFetchingAmenities(false);
      }
    };

    fetchAmenities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (latitude, longitude) => {
    setFormData((prev) => ({
      ...prev,
      latitude: parseFloat(latitude.toFixed(4)),
      longitude: parseFloat(longitude.toFixed(4)),
    }));
  };

  const toggleAmenity = (amenityId) => {
    setFormData((prev) => ({
      ...prev,
      amenity_ids: prev.amenity_ids.includes(amenityId)
        ? prev.amenity_ids.filter((id) => id !== amenityId)
        : [...prev.amenity_ids, amenityId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const placeData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        amenity_ids: formData.amenity_ids || [],
        // Removed owner_id - let backend set it automatically
      };

      // Validation
      if (!placeData.title) {
        addToast('Title is required', 'error');
        setLoading(false);
        return;
      }

      if (!placeData.price || placeData.price <= 0) {
        addToast('Valid price is required', 'error');
        setLoading(false);
        return;
      }

      console.log('Place data being sent:', JSON.stringify(placeData, null, 2));

      const newPlace = await createPlace(placeData);
      addToast('Place created successfully!', 'success');
      setTimeout(() => navigate(`/place/${newPlace.id}`), 1500);
    } catch (error) {
      console.error('Full error:', error);
      console.error('Response data:', error.response?.data);
      const errorMsg = error.response?.data?.message ||
                       Object.values(error.response?.data || {})[0] ||
                       'Error creating place';
      addToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 dark:text-gray-100">Create a New Place</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-gray-100"
              placeholder="Amazing Apartment"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-gray-100"
              placeholder="Describe your place..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Price per Night</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-gray-100"
                placeholder="150"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Currency</label>
              <input
                type="text"
                value="USD"
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
              />
            </div>
          </div>

          {/* Location Section with Map */}
          <div>
            <label className="block text-sm font-medium mb-4 dark:text-gray-300">Location</label>
            <MapPicker
              latitude={formData.latitude}
              longitude={formData.longitude}
              onLocationChange={handleLocationChange}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Click on the map to select location</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-gray-100"
                placeholder="48.8566"
                step="0.0001"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Longitude</label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-gray-100"
                placeholder="2.3522"
                step="0.0001"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4 dark:text-gray-300">Amenities</label>
            {fetchingAmenities ? (
              <p className="text-gray-500 dark:text-gray-400">Loading amenities...</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <label key={amenity.id} className="flex items-center gap-2 cursor-pointer dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.amenity_ids.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="w-4 h-4"
                    />
                    <span>{amenity.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Place'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/places')}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Toast Messages */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg text-white font-medium ${
              toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

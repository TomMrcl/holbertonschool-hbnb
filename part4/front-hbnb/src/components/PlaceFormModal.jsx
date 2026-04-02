import { useState, useEffect } from 'react';
import Modal from './Modal';
import MapPicker from './MapPicker';

export default function PlaceFormModal({ isOpen, onClose, onSubmit, place = null, amenities = [], loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    latitude: '',
    longitude: '',
    amenity_ids: [],
  });

  useEffect(() => {
    if (place) {
      setFormData({
        title: place.title || '',
        description: place.description || '',
        price: place.price || '',
        latitude: place.latitude ? parseFloat(place.latitude.toFixed(4)) : '',
        longitude: place.longitude ? parseFloat(place.longitude.toFixed(4)) : '',
        amenity_ids: place.amenity_ids || [],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        latitude: 48.8566,
        longitude: 2.3522,
        amenity_ids: [],
      });
    }
  }, [place, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit lat/lng to 4 decimal places
    if ((name === 'latitude' || name === 'longitude') && value) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const limited = parseFloat(numValue.toFixed(4));
        setFormData((prev) => ({
          ...prev,
          [name]: limited.toString(),
        }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenityId) => {
    setFormData((prev) => {
      const amenity_ids = prev.amenity_ids.includes(amenityId)
        ? prev.amenity_ids.filter((id) => id !== amenityId)
        : [...prev.amenity_ids, amenityId];
      return { ...prev, amenity_ids };
    });
  };

  const handleMapPick = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: parseFloat(lat.toFixed(4)),
      longitude: parseFloat(lng.toFixed(4)),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={place ? 'Edit Your Place' : 'Create a New Place'}
      className="max-w-4xl max-h-[95vh] overflow-y-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Place Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Cozy Apartment in Paris"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your place..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Price per Night ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 150"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Location Section */}
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-lg mb-3 dark:text-gray-100">Location</h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Pick Location on Map</label>
              <div className="h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <MapPicker
                  latitude={parseFloat(formData.latitude)}
                  longitude={parseFloat(formData.longitude)}
                  onMapPick={handleMapPick}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="e.g., 48.8566"
                  step="0.0001"
                  min="-90"
                  max="90"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="e.g., 2.3522"
                  step="0.0001"
                  min="-180"
                  max="180"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-lg mb-3 dark:text-gray-100">Amenities</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {amenities.map((amenity) => (
                <label key={amenity.id} className="flex items-center gap-3 cursor-pointer dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.amenity_ids.includes(amenity.id)}
                    onChange={() => handleAmenityChange(amenity.id)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Buttons at Bottom */}
        <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 flex gap-3 shrink-0">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : place ? 'Update Place' : 'Create Place'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

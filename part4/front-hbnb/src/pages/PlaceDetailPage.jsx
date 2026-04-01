import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaceById, getPlaceReviews, createReview, deleteReview, updateReview, updatePlace, deletePlace } from '../services/places';
import { listAmenities } from '../services/amenities';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import PlaceFormModal from '../components/PlaceFormModal';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import { useToast } from '../components/ToastContainer';
import { useAuth } from '../contexts/AuthContext';

export default function PlaceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showPlaceFormModal, setShowPlaceFormModal] = useState(false);
  const [updatingPlace, setUpdatingPlace] = useState(false);
  const { toasts, addToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeData = await getPlaceById(id);
        setPlace(placeData);

        const reviewsData = await getPlaceReviews(id);
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);

        const amenitiesData = await listAmenities();
        setAmenities(Array.isArray(amenitiesData) ? amenitiesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        addToast('Error loading place details', 'error');
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const getAmenityNames = (amenityIds) => {
    return amenityIds
      .map((id) => {
        const amenity = amenities.find((a) => a.id === id);
        return amenity ? amenity.name : null;
      })
      .filter(Boolean);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText.trim()) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setSubmitting(true);

    try {
      if (editingReviewId) {
        // Update existing review
        await updateReview(editingReviewId, {
          rating,
          text: reviewText,
        });
        addToast('Review updated successfully!', 'success');
      } else {
        // Create new review
        await createReview(id, {
          rating,
          text: reviewText,
        });
        addToast('Review added successfully!', 'success');
      }

      // Refresh reviews
      const reviewsData = await getPlaceReviews(id);
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);

      setReviewText('');
      setRating(0);
      setEditingReviewId(null);
      setShowReviewModal(false);
    } catch (error) {
      console.error('Error saving review:', error);
      addToast('Error saving review', 'error');
    }

    setSubmitting(false);
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review.id);
    setReviewText(review.text);
    setRating(review.rating);
    setShowReviewModal(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((r) => r.id !== reviewId));
      addToast('Review deleted!', 'success');
    } catch (error) {
      console.error('Error deleting review:', error);
      addToast('Error deleting review', 'error');
    }
  };

  const handleUpdatePlace = async (formData) => {
    setUpdatingPlace(true);
    try {
      await updatePlace(id, formData);
      const updatedPlace = await getPlaceById(id);
      setPlace(updatedPlace);
      setShowPlaceFormModal(false);
      addToast('Place updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating place:', error);
      addToast('Error updating place', 'error');
    } finally {
      setUpdatingPlace(false);
    }
  };

  const handleDeletePlace = async () => {
    if (!window.confirm('Are you sure you want to delete this place? This action cannot be undone.')) {
      return;
    }

    try {
      await deletePlace(id);
      addToast('Place deleted successfully!', 'success');
      navigate('/places');
    } catch (error) {
      console.error('Error deleting place:', error);
      addToast('Error deleting place', 'error');
    }
  };

  const isPlaceOwner = user && user.id && place && place.owner_id === user.id;

  if (loading) return <LoadingSpinner />;
  if (!place) return <div className="text-center py-12">Place not found</div>;

  const amenityNames = getAmenityNames(place.amenity_ids || []);
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Place Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-96 bg-gradient-to-br from-primary to-red-400"></div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold">{place.title}</h1>
              {isPlaceOwner && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPlaceFormModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center gap-2"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={handleDeletePlace}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium flex items-center gap-2"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-lg mb-6">{place.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Details</h3>
                <div className="space-y-2">
                  <p><strong>Price:</strong> ${place.price}/night</p>
                  <p><strong>Location:</strong> {place.latitude}, {place.longitude}</p>
                  {place.owner && (
                    <p><strong>Owner:</strong> {place.owner.first_name} {place.owner.last_name}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {amenityNames.length > 0 ? (
                    amenityNames.map((name, idx) => (
                      <span key={idx} className="badge bg-primary text-white">
                        {name}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No amenities listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{avgRating}</div>
              <div className="text-yellow-500">★ ({reviews.length} reviews)</div>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingReviewId(null);
              setReviewText('');
              setRating(0);
              setShowReviewModal(true);
            }}
            className="btn-primary mb-8"
          >
            Add Review
          </button>

          {/* Modal */}
          <Modal
            isOpen={showReviewModal}
            onClose={() => {
              setShowReviewModal(false);
              setEditingReviewId(null);
              setReviewText('');
              setRating(0);
            }}
            title={editingReviewId ? 'Edit Your Review' : 'Add Your Review'}
          >
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Rating</label>
                <StarRating onRate={setRating} initialRating={rating} />
              </div>

              <div>
                <label className="block font-medium mb-2">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : editingReviewId ? 'Update Review' : 'Submit Review'}
              </button>
            </form>
          </Modal>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reviews yet. Be the first!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.user_id?.substring(0, 8) || 'User'}</span>
                      <span className="text-yellow-500">★ {review.rating}</span>
                    </div>
                    {user && user.id && user.id === review.user_id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm">{review.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Place Form Modal */}
      <PlaceFormModal
        isOpen={showPlaceFormModal}
        onClose={() => setShowPlaceFormModal(false)}
        onSubmit={handleUpdatePlace}
        place={place}
        amenities={amenities}
        loading={updatingPlace}
      />

      {/* Toasts */}
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

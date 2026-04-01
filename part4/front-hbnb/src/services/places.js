import API from './api';

export const getPlaces = async () => {
  const response = await API.get('/api/v1/places/');
  return response.data;
};

export const getPlaceById = async (id) => {
  const response = await API.get(`/api/v1/places/${id}`);
  return response.data;
};

export const createPlace = async (data) => {
  const response = await API.post('/api/v1/places/', data);
  return response.data;
};

export const updatePlace = async (id, data) => {
  const response = await API.put(`/api/v1/places/${id}`, data);
  return response.data;
};

export const deletePlace = async (id) => {
  await API.delete(`/api/v1/places/${id}`);
};

export const getPlaceReviews = async (placeId) => {
  const response = await API.get(`/api/v1/places/${placeId}/reviews`);
  return response.data;
};

export const createReview = async (placeId, data) => {
  const response = await API.post('/api/v1/reviews/', {
    place_id: placeId,
    rating: parseInt(data.rating, 10),
    text: data.text
  });
  return response.data;
};

export const getReviewById = async (reviewId) => {
  const response = await API.get(`/api/v1/reviews/${reviewId}`);
  return response.data;
};

export const updateReview = async (reviewId, data) => {
  const response = await API.put(`/api/v1/reviews/${reviewId}`, data);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  await API.delete(`/api/v1/reviews/${reviewId}`);
};

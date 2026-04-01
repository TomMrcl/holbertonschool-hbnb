import API from './api';

export const listAmenities = async () => {
  const response = await API.get('/api/v1/amenities/');
  return response.data;
};

export const getAmenityById = async (amenityId) => {
  const response = await API.get(`/api/v1/amenities/${amenityId}`);
  return response.data;
};

export const createAmenity = async (data) => {
  const response = await API.post('/api/v1/amenities/', data);
  return response.data;
};

export const updateAmenity = async (amenityId, data) => {
  const response = await API.put(`/api/v1/amenities/${amenityId}`, data);
  return response.data;
};

export const deleteAmenity = async (amenityId) => {
  await API.delete(`/api/v1/amenities/${amenityId}`);
};

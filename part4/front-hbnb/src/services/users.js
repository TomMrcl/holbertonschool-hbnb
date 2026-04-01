import API from './api';

export const listUsers = async () => {
  const response = await API.get('/api/v1/users/');
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await API.get(`/api/v1/users/${userId}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await API.post('/api/v1/users/', data);
  return response.data;
};

export const updateUser = async (userId, data) => {
  const response = await API.put(`/api/v1/users/${userId}`, data);
  return response.data;
};

export const deleteUser = async (userId) => {
  await API.delete(`/api/v1/users/${userId}`);
};

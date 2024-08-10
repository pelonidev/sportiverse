import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
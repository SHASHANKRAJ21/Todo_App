import axios from 'axios';

const BASE_URL = 'https://renewed-consideration-production.up.railway.app';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false, 
});

export const signup     = (data)         => api.post('/auth/signup', data);
export const login      = (data)         => api.post('/auth/login', data);
export const fetchTodos = (userId)       => api.get(`/todos/${userId}`);
export const createTodo = (userId, data) => api.post(`/todos/${userId}`, data);
export const toggleTodo = (id)           => api.patch(`/todos/${id}/toggle`);
export const deleteTodo = (id)           => api.delete(`/todos/${id}`);

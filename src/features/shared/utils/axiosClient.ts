import { API_URL } from '@/config';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // todo: use Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

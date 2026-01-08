import { API_URL } from '@/config';
import { useUserStore } from '@/stores/useUserStore';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `[Request] ${config.method?.toUpperCase()} -> ${config.url}`,
      {
        params: config.params,
        data: config.data,
      }
    );

    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

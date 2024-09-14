import { isAuthenticated } from '@/utils/auth';
import axios from 'axios';

const pureClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

pureClient.interceptors.request.use(
  (config) => {
    const token = isAuthenticated();
    if (token) {
      config.headers.Authorization = token;
    } else {
      if (window) {
        window.location.href = window.location.origin;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

pureClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - Please login again.');
    } else {
      console.error('An error occurred:', error.message);
    }
    return Promise.reject(error);
  }
);

export default pureClient;

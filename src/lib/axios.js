import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

let refreshPromise = null;

// Intercepteur pour gérer l'expiration des tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        if (!refreshPromise) {
          refreshPromise = api.post('/auth/refresh-token');
          await refreshPromise;
          refreshPromise = null;
          return api(originalRequest);
        } else {
          await refreshPromise;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Rediriger vers la page de connexion ou déconnecter l'utilisateur
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
import axios from 'axios';

// Configuration de base d'axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Service d'authentification (simplifié)
export const authService = {
  getProfile: async () => {
    // Retourner un utilisateur par défaut
    return {
      id: 1,
      name: 'Administrateur',
      email: 'admin@example.com',
      role: 'admin'
    };
  },
  
  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
  
  changePassword: async (data) => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  }
};

// Service des produits
export const productService = {
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/products', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  
  updateStock: async (id, stock) => {
    const response = await api.patch(`/products/${id}/stock`, { stock });
    return response.data;
  },
  
  toggleStatus: async (id) => {
    const response = await api.patch(`/products/${id}/toggle-status`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/products/stats/overview');
    return response.data;
  }
};

// Service des commandes
export const orderService = {
  getAll: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  updateStatus: async (id, data) => {
    const response = await api.patch(`/orders/${id}/status`, data);
    return response.data;
  },
  
  updatePaymentStatus: async (id, paymentStatus) => {
    const response = await api.patch(`/orders/${id}/payment-status`, { paymentStatus });
    return response.data;
  },
  
  addTracking: async (id, trackingNumber) => {
    const response = await api.patch(`/orders/${id}/tracking`, { trackingNumber });
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/orders/stats');
    return response.data;
  },
  
  getRecent: async (limit = 5) => {
    const response = await api.get('/orders/recent', { params: { limit } });
    return response.data;
  },
  
  export: async (params = {}) => {
    const response = await api.get('/orders/export', { params });
    return response.data;
  }
};

export default api;
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://avecamour.wikiplug.com/api';

// Configuration axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    
    // Gérer les erreurs de connexion
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
      console.error('Erreur de connexion à l\'API:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Service pour les produits
export const productService = {
  // Obtenir tous les produits
  getAllProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Obtenir un produit par ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Créer un produit
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Mettre à jour un produit
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Supprimer un produit
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Mettre à jour le stock
  updateStock: async (id, stock) => {
    const response = await api.patch(`/products/${id}/stock`, { stock });
    return response.data;
  },

  // Activer/Désactiver un produit
  toggleStatus: async (id) => {
    const response = await api.patch(`/products/${id}/toggle-status`);
    return response.data;
  },

  // Obtenir les statistiques
  getStats: async () => {
    const response = await api.get('/products/stats/overview');
    return response.data;
  },

  // Rechercher des produits
  searchProducts: async (query, limit = 10) => {
    const response = await api.get('/products/search', {
      params: { q: query, limit }
    });
    return response.data;
  }
};

// Service pour les catégories
export const categoryService = {
  // Obtenir toutes les catégories
  getAllCategories: async (params = {}) => {
    const response = await api.get('/categories', { params });
    return response.data;
  },

  // Obtenir une catégorie par ID
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Créer une catégorie
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  // Mettre à jour une catégorie
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Supprimer une catégorie
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Obtenir l'arbre des catégories
  getCategoryTree: async () => {
    const response = await api.get('/categories/tree');
    return response.data;
  },

  // Activer/Désactiver une catégorie
  toggleStatus: async (id) => {
    const response = await api.patch(`/categories/${id}/toggle-status`);
    return response.data;
  },

  // Obtenir les statistiques
  getStats: async () => {
    const response = await api.get('/categories/stats/overview');
    return response.data;
  }
};

// Service pour l'authentification
export const authService = {
  // Connexion
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Vérifier le token
  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  // Rafraîchir le token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  }
};

// Service pour les commandes
export const orderService = {
  // Obtenir toutes les commandes
  getAllOrders: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  // Obtenir une commande par ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Mettre à jour le statut d'une commande
  updateOrderStatus: async (id, status) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Obtenir les statistiques
  getStats: async () => {
    const response = await api.get('/orders/stats/overview');
    return response.data;
  }
};

export default api;
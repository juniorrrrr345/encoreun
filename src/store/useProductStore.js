import { create } from 'zustand';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  selectedProduct: null,

  // Récupérer tous les produits
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/products');
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors du chargement des produits');
    }
  },

  // Récupérer un produit par ID
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const response = await api.get(`/products/${id}`);
      set({ selectedProduct: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      toast.error('Produit non trouvé');
      return null;
    }
  },

  // Récupérer les produits par catégorie
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await api.get(`/products/category/${category}`);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors du chargement de la catégorie');
    }
  },

  // Récupérer les catégories
  fetchCategories: async () => {
    try {
      const response = await api.get('/categories');
      set({ categories: response.data });
    } catch (error) {
      toast.error('Erreur lors du chargement des catégories');
    }
  },

  // Créer un nouveau produit (admin)
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const response = await api.post('/products', productData);
      set((state) => ({
        products: [...state.products, response.data],
        loading: false
      }));
      toast.success('Produit créé avec succès');
      return response.data;
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors de la création du produit');
      throw error;
    }
  },

  // Mettre à jour un produit (admin)
  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const response = await api.put(`/products/${id}`, productData);
      set((state) => ({
        products: state.products.map(p => p._id === id ? response.data : p),
        loading: false
      }));
      toast.success('Produit mis à jour avec succès');
      return response.data;
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors de la mise à jour du produit');
      throw error;
    }
  },

  // Supprimer un produit (admin)
  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter(p => p._id !== id)
      }));
      toast.success('Produit supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit');
    }
  },

  // Rechercher des produits
  searchProducts: async (query) => {
    set({ loading: true });
    try {
      const response = await api.get(`/products/search?q=${query}`);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors de la recherche');
    }
  }
}));

export default useProductStore;
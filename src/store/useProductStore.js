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
      console.log('Utilisation des produits de test');
      // Utiliser des produits de test si l'API n'est pas disponible
      const testProducts = [
        {
          _id: '1',
          name: 'T-shirt Premium',
          description: 'T-shirt en coton bio de haute qualité, confortable et durable',
          price: 29.99,
          category: 'Vêtements',
          stock: 50,
          isActive: true,
          mainImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop'
        },
        {
          _id: '2',
          name: 'Crème hydratante',
          description: 'Crème hydratante naturelle pour tous types de peau',
          price: 24.99,
          category: 'Beauté',
          stock: 30,
          isActive: true,
          mainImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
        },
        {
          _id: '3',
          name: 'Vase décoratif',
          description: 'Vase en céramique élégant pour décorer votre intérieur',
          price: 45.00,
          category: 'Maison',
          stock: 15,
          isActive: true,
          mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
        },
        {
          _id: '4',
          name: 'Bracelet en argent',
          description: 'Bracelet élégant en argent sterling, parfait pour tous les styles',
          price: 89.99,
          category: 'Bijoux',
          stock: 25,
          isActive: true,
          mainImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
        },
        {
          _id: '5',
          name: 'Écouteurs sans fil',
          description: 'Écouteurs bluetooth haute qualité avec réduction de bruit',
          price: 129.99,
          category: 'Tech',
          stock: 40,
          isActive: true,
          mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
        },
        {
          _id: '6',
          name: 'Leggings de sport',
          description: 'Leggings confortables et respirants pour vos séances de sport',
          price: 34.99,
          category: 'Sport',
          stock: 35,
          isActive: true,
          mainImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop'
        }
      ];
      set({ products: testProducts, loading: false });
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
      console.log('Utilisation des catégories par défaut');
      // En cas d'erreur, on utilise les catégories par défaut
      set({ categories: [] });
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